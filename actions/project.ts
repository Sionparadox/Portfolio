'use server';

import { ActionResult } from '@/types/actionResult';
import { ProjectItemType } from '@/types/project';
import { put } from '@vercel/blob';
import { unstable_cache, revalidateTag } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

// 날짜 문자열을 Date 객체로 변환하는 헬퍼 함수
const parseProjectDates = (project: ProjectItemType): ProjectItemType => {
  return {
    ...project,
    startDate: new Date(project.startDate),
    endDate: project.endDate ? new Date(project.endDate) : null,
    createdAt: new Date(project.createdAt),
    updatedAt: new Date(project.updatedAt),
  };
};

// 전체 프로젝트 가져오기
export async function getProjects(): Promise<ActionResult<ProjectItemType[]>> {
  try {
    // unstable_cache로 데이터베이스 조회 결과 캐싱
    const getCachedProjects = unstable_cache(
      async () => {
        return await prisma.project.findMany({
          orderBy: { order: 'desc' },
        });
      },
      ['projects-list'],
      {
        revalidate: false,
        tags: ['projects'],
      }
    );

    const rawData = await getCachedProjects();
    const data = rawData.map(parseProjectDates);

    return {
      success: true,
      message: '프로젝트를 성공적으로 불러왔습니다.',
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: '프로젝트를 불러오는 중 오류가 발생했습니다.',
      error: error instanceof Error ? error.message : '알 수 없는 오류',
    };
  }
}

// 개별 프로젝트 가져오기
export async function getProject(
  slug: string
): Promise<ActionResult<ProjectItemType>> {
  try {
    // 개별 프로젝트도 캐싱
    const getCachedProject = unstable_cache(
      async (projectSlug: string) => {
        return await prisma.project.findUnique({
          where: { slug: projectSlug },
        });
      },
      [`project-${slug}`],
      {
        revalidate: false,
        tags: ['projects', `project-${slug}`],
      }
    );

    const rawData = await getCachedProject(slug);

    if (!rawData) {
      return {
        success: false,
        message: '프로젝트를 찾을 수 없습니다.',
      };
    }

    const data = parseProjectDates(rawData);

    return {
      success: true,
      message: '프로젝트를 성공적으로 불러왔습니다.',
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: '프로젝트를 불러오는 중 오류가 발생했습니다.',
      error: error instanceof Error ? error.message : '알 수 없는 오류',
    };
  }
}

// 특정 order를 기준으로 이전/다음 프로젝트 가져오기
export async function getAdjacentProjects(
  currentOrder: number
): Promise<
  ActionResult<{ prev: ProjectItemType | null; next: ProjectItemType | null }>
> {
  try {
    const getCachedAdjacentProjects = unstable_cache(
      async (order: number) => {
        return await Promise.all([
          // 이전 프로젝트
          prisma.project.findFirst({
            where: { order: { lt: order } },
            orderBy: { order: 'desc' },
          }),
          // 다음 프로젝트
          prisma.project.findFirst({
            where: { order: { gt: order } },
            orderBy: { order: 'asc' },
          }),
        ]);
      },
      [`adjacent-projects-${currentOrder}`],
      {
        revalidate: false,
        tags: ['projects', `adjacent-${currentOrder}`],
      }
    );

    const [prevProject, nextProject] =
      await getCachedAdjacentProjects(currentOrder);

    return {
      success: true,
      message: '인접 프로젝트를 성공적으로 불러왔습니다.',
      data: {
        prev: prevProject ? parseProjectDates(prevProject) : null,
        next: nextProject ? parseProjectDates(nextProject) : null,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: '인접 프로젝트를 불러오는 중 오류가 발생했습니다.',
      error: error instanceof Error ? error.message : '알 수 없는 오류',
    };
  }
}

export async function createProject(
  formData: FormData
): Promise<ActionResult<null>> {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, message: '권한이 없습니다.' };
    }

    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const overview = formData.get('overview') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const teamSize = parseInt(formData.get('teamSize') as string) || 1;
    const role = formData.get('role') as string;
    const startDateStr = formData.get('startDate') as string;
    const endDateStr = formData.get('endDate') as string;
    const github = formData.get('github') as string;
    const link = formData.get('link') as string;
    const featured = formData.get('featured') === 'on';
    const order = parseInt(formData.get('order') as string) || 0;

    if (
      !title ||
      !slug ||
      !overview ||
      !description ||
      !category ||
      !startDateStr
    ) {
      return { success: false, message: '필수 항목을 모두 입력해주세요.' };
    }

    const startDate = new Date(startDateStr);
    const endDate = endDateStr ? new Date(endDateStr) : null;

    // 배열 데이터 처리 (콤마 또는 줄바꿈 기준)
    const techStack = ((formData.get('techStack') as string) || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const contributions = ((formData.get('contributions') as string) || '')
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    const insights = ((formData.get('insights') as string) || '')
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    // 파일 처리
    const thumbnailFile = formData.get('thumbnail') as File;
    const iconFile = formData.get('icon') as File;

    if (
      !thumbnailFile ||
      thumbnailFile.size === 0 ||
      !iconFile ||
      iconFile.size === 0
    ) {
      return {
        success: false,
        message: '썸네일과 아이콘 이미지는 필수입니다.',
      };
    }

    // Vercel Blob에 이미지 업로드
    const thumbnailBlob = await put(
      `projects/${slug}/thumbnail-${thumbnailFile.name}`,
      thumbnailFile,
      { access: 'public' }
    );
    const iconBlob = await put(
      `projects/${slug}/icon-${iconFile.name}`,
      iconFile,
      { access: 'public' }
    );

    // DB 저장
    await prisma.project.create({
      data: {
        title,
        slug,
        overview,
        description,
        category,
        teamSize,
        role,
        startDate,
        endDate,
        github,
        link,
        featured,
        order,
        techStack,
        contributions,
        insights,
        thumbnail: thumbnailBlob.url,
        icon: iconBlob.url,
      },
    });

    // 캐시 무효화
    revalidateTag('projects');

    return {
      success: true,
      message: '프로젝트가 성공적으로 생성되었습니다.',
      data: null,
    };
  } catch (error) {
    return {
      success: false,
      message: '프로젝트 생성 중 오류가 발생했습니다.',
      error: error instanceof Error ? error.message : '알 수 없는 오류',
    };
  }
}

export async function updateProject(
  id: string,
  formData: FormData
): Promise<ActionResult<null>> {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, message: '권한이 없습니다.' };
    }

    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const overview = formData.get('overview') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const teamSize = parseInt(formData.get('teamSize') as string) || 1;
    const role = formData.get('role') as string;
    const startDateStr = formData.get('startDate') as string;
    const endDateStr = formData.get('endDate') as string;
    const github = formData.get('github') as string;
    const link = formData.get('link') as string;
    const featured = formData.get('featured') === 'on';
    const order = parseInt(formData.get('order') as string) || 0;

    if (
      !title ||
      !slug ||
      !overview ||
      !description ||
      !category ||
      !startDateStr
    ) {
      return { success: false, message: '필수 항목을 모두 입력해주세요.' };
    }

    const startDate = new Date(startDateStr);
    const endDate = endDateStr ? new Date(endDateStr) : null;

    // 배열 데이터 처리
    const techStack = ((formData.get('techStack') as string) || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const contributions = ((formData.get('contributions') as string) || '')
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    const insights = ((formData.get('insights') as string) || '')
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    // 업데이트할 데이터 객체 구성
    const updateData: any = {
      title,
      slug,
      overview,
      description,
      category,
      teamSize,
      role,
      startDate,
      endDate,
      github,
      link,
      featured,
      order,
      techStack,
      contributions,
      insights,
    };

    // 새로운 파일이 업로드된 경우에만 Vercel Blob에 업로드하고 URL 업데이트
    const thumbnailFile = formData.get('thumbnail') as File | null;
    const iconFile = formData.get('icon') as File | null;

    if (thumbnailFile && thumbnailFile.size > 0) {
      const thumbnailBlob = await put(
        `projects/${slug}/thumbnail-${thumbnailFile.name}`,
        thumbnailFile,
        { access: 'public' }
      );
      updateData.thumbnail = thumbnailBlob.url;
    }

    if (iconFile && iconFile.size > 0) {
      const iconBlob = await put(
        `projects/${slug}/icon-${iconFile.name}`,
        iconFile,
        { access: 'public' }
      );
      updateData.icon = iconBlob.url;
    }

    // DB 업데이트
    await prisma.project.update({
      where: { id },
      data: updateData,
    });

    // 캐시 무효화 (전체 목록 & 개별 프로젝트)
    revalidateTag('projects');
    revalidateTag(`project-${slug}`);

    return {
      success: true,
      message: '프로젝트가 성공적으로 수정되었습니다.',
      data: null,
    };
  } catch (error) {
    return {
      success: false,
      message: '프로젝트 수정 중 오류가 발생했습니다.',
      error: error instanceof Error ? error.message : '알 수 없는 오류',
    };
  }
}

// 프로젝트 삭제
export async function deleteProject(id: string): Promise<ActionResult<null>> {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, message: '권한이 없습니다.' };
    }

    await prisma.project.delete({
      where: { id },
    });

    // 캐시 무효화
    revalidateTag('projects');

    return {
      success: true,
      message: '프로젝트가 성공적으로 삭제되었습니다.',
      data: null,
    };
  } catch (error) {
    return {
      success: false,
      message: '프로젝트 삭제 중 오류가 발생했습니다.',
      error: error instanceof Error ? error.message : '알 수 없는 오류',
    };
  }
}

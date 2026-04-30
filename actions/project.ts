'use server';

import { auth } from '@/auth';
import { ActionResult } from '@/types/actionResult';
import { ProjectItemType } from '@/types/project';
import { put, del } from '@vercel/blob';
import { revalidateTag } from 'next/cache';
import { prisma } from '@/lib/prisma';
import {
  extractProjectFormRaw,
  hasRequiredProjectFields,
  parseProjectForm,
} from '@/lib/project-form';
import {
  getAdjacentProjectsQuery,
  getProjectQuery,
  getProjectsQuery,
} from '@/lib/project-queries';

// 전체 프로젝트 가져오기
export async function getProjects(): Promise<ActionResult<ProjectItemType[]>> {
  return await getProjectsQuery();
}

// 개별 프로젝트 가져오기
export async function getProject(
  slug: string
): Promise<ActionResult<ProjectItemType>> {
  return await getProjectQuery(slug);
}

// 특정 order를 기준으로 이전/다음 프로젝트 가져오기
export async function getAdjacentProjects(
  currentOrder: number
): Promise<
  ActionResult<{ prev: ProjectItemType | null; next: ProjectItemType | null }>
> {
  return await getAdjacentProjectsQuery(currentOrder);
}

export async function createProject(
  formData: FormData
): Promise<ActionResult<null>> {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, message: '권한이 없습니다.' };
    }

    const raw = extractProjectFormRaw(formData);
    if (!hasRequiredProjectFields(raw)) {
      return { success: false, message: '필수 항목을 모두 입력해주세요.' };
    }
    const parsed = parseProjectForm(raw);
    const { slug } = parsed;

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
        title: parsed.title,
        slug: parsed.slug,
        overview: parsed.overview,
        description: parsed.description,
        category: parsed.category,
        teamSize: parsed.teamSize,
        role: parsed.role,
        startDate: parsed.startDate,
        endDate: parsed.endDate,
        github: parsed.github,
        link: parsed.link,
        featured: parsed.featured,
        order: parsed.order,
        techStack: parsed.techStack,
        contributions: parsed.contributions,
        insights: parsed.insights,
        thumbnail: thumbnailBlob.url,
        icon: iconBlob.url,
      },
    });

    // 캐시 무효화
    revalidateTag('projects');
    revalidateTag(`adjacent-${parsed.order}`);

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

    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return { success: false, message: '프로젝트를 찾을 수 없습니다.' };
    }

    const raw = extractProjectFormRaw(formData);
    if (!hasRequiredProjectFields(raw)) {
      return { success: false, message: '필수 항목을 모두 입력해주세요.' };
    }
    const parsed = parseProjectForm(raw);

    // 업데이트할 데이터 객체 구성
    const updateData: Omit<
      ProjectItemType,
      'id' | 'thumbnail' | 'icon' | 'createdAt' | 'updatedAt'
    > & {
      thumbnail?: string;
      icon?: string;
    } = {
      title: parsed.title,
      slug: parsed.slug,
      overview: parsed.overview,
      description: parsed.description,
      category: parsed.category,
      teamSize: parsed.teamSize,
      role: parsed.role,
      startDate: parsed.startDate,
      endDate: parsed.endDate,
      github: parsed.github,
      link: parsed.link,
      featured: parsed.featured,
      order: parsed.order,
      techStack: parsed.techStack,
      contributions: parsed.contributions,
      insights: parsed.insights,
    };

    // 새로운 파일이 업로드된 경우에만 Vercel Blob에 업로드하고 URL 업데이트
    const thumbnailFile = formData.get('thumbnail') as File | null;
    const iconFile = formData.get('icon') as File | null;

    if (thumbnailFile && thumbnailFile.size > 0) {
      if (existingProject.thumbnail) {
        try {
          await del(existingProject.thumbnail);
        } catch (e) {
          console.error('Failed to delete old thumbnail:', e);
        }
      }
      const thumbnailBlob = await put(
        `projects/${parsed.slug}/thumbnail-${thumbnailFile.name}`,
        thumbnailFile,
        { access: 'public' }
      );
      updateData.thumbnail = thumbnailBlob.url;
    }

    if (iconFile && iconFile.size > 0) {
      if (existingProject.icon) {
        try {
          await del(existingProject.icon);
        } catch (e) {
          console.error('Failed to delete old icon:', e);
        }
      }
      const iconBlob = await put(
        `projects/${parsed.slug}/icon-${iconFile.name}`,
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
    revalidateTag(`project-${parsed.slug}`);
    revalidateTag(`adjacent-${parsed.order}`);
    revalidateTag(`adjacent-${existingProject.order}`);
    if (existingProject.slug !== parsed.slug) {
      revalidateTag(`project-${existingProject.slug}`);
    }

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

    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return { success: false, message: '프로젝트를 찾을 수 없습니다.' };
    }

    // Vercel Blob에서 이미지 삭제
    const blobsToDelete = [];
    if (existingProject.thumbnail)
      blobsToDelete.push(existingProject.thumbnail);
    if (existingProject.icon) blobsToDelete.push(existingProject.icon);

    if (blobsToDelete.length > 0) {
      try {
        await del(blobsToDelete);
      } catch (e) {
        console.error('Failed to delete blobs:', e);
      }
    }

    await prisma.project.delete({
      where: { id },
    });

    // 캐시 무효화
    revalidateTag('projects');
    revalidateTag(`project-${existingProject.slug}`);
    revalidateTag(`adjacent-${existingProject.order}`);

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

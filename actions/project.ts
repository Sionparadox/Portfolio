'use server';

import { ActionResult } from '@/types/actionResult';
import { ProjectItemType } from '@/types/project';
import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';

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

'use server';

import { ActionResult } from '@/types/actionResult';
import { ProjectItemType } from '@/types/project';
import { prisma } from '@/lib/prisma';

// 전체 프로젝트 가져오기
export async function getProjects(): Promise<ActionResult<ProjectItemType[]>> {
  try {
    const rawData = await prisma.project.findMany({
      orderBy: { order: 'desc' },
    });

    return {
      success: true,
      message: '프로젝트를 성공적으로 불러왔습니다.',
      data: rawData,
    };
  } catch (error) {
    return {
      success: false,
      message: '프로젝트를 불러오는 중 오류가 발생했습니다.',
      error: error instanceof Error ? error.message : '알 수 없는 오류',
    };
  }
}

// 개별 프로젝트 가져오기 (slug 기준)
export async function getProject(
  slug: string
): Promise<ActionResult<ProjectItemType>> {
  try {
    const rawData = await prisma.project.findUnique({
      where: { slug },
    });

    if (!rawData) {
      return {
        success: false,
        message: '프로젝트를 찾을 수 없습니다.',
      };
    }

    return {
      success: true,
      message: '프로젝트를 성공적으로 불러왔습니다.',
      data: rawData,
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
    const [prevProject, nextProject] = await Promise.all([
      // 이전 프로젝트
      prisma.project.findFirst({
        where: { order: { lt: currentOrder } },
        orderBy: { order: 'desc' },
      }),
      // 다음 프로젝트
      prisma.project.findFirst({
        where: { order: { gt: currentOrder } },
        orderBy: { order: 'asc' },
      }),
    ]);

    return {
      success: true,
      message: '인접 프로젝트를 성공적으로 불러왔습니다.',
      data: {
        prev: prevProject ?? null,
        next: nextProject ?? null,
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

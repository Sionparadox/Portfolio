'use server';

import { ActionResult } from '@/types/actionResult';
import { TimelineItemType } from '@/types/timeline';
import { prisma } from '@/lib/prisma';

export async function getTimelines(): Promise<
  ActionResult<TimelineItemType[]>
> {
  try {
    const rawData = await prisma.timeline.findMany({
      orderBy: { year: 'desc' },
    });

    const timelines: TimelineItemType[] = rawData.map((item) => ({
      id: item.id,
      type: item.type as TimelineItemType['type'],
      year: item.year,
      date: item.date,
      place: item.place,
      title: item.title,
      descriptions: item.descriptions as string[],
      image: item.image ?? undefined,
    }));

    return {
      success: true,
      message: '타임라인 데이터를 성공적으로 불러왔습니다.',
      data: timelines,
    };
  } catch (error) {
    return {
      success: false,
      message: '타임라인 데이터를 불러오는 중 오류가 발생했습니다.',
      error: String(error),
    };
  }
}

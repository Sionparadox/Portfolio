import { ActionResult } from '@/types/actionResult';
import { TimelineItemType } from '@/types/timeline';
import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { mapTimelineItem } from './timeline-form';

export async function getTimelinesQuery(): Promise<
  ActionResult<TimelineItemType[]>
> {
  try {
    const getCachedTimelines = unstable_cache(
      async () => {
        const rawData = await prisma.timeline.findMany({
          orderBy: { year: 'desc' },
        });

        return rawData.map(mapTimelineItem);
      },
      ['timelines'],
      {
        revalidate: false,
        tags: ['timelines'],
      }
    );

    const timelines = await getCachedTimelines();

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

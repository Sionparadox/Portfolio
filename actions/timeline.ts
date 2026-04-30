'use server';

import { auth } from '@/auth';
import { ActionResult } from '@/types/actionResult';
import { TimelineItemType } from '@/types/timeline';
import { put, del } from '@vercel/blob';
import { revalidateTag } from 'next/cache';
import { prisma } from '@/lib/prisma';
import {
  extractTimelineFormRaw,
  hasRequiredTimelineFields,
  parseTimelineDescriptions,
} from '@/lib/timeline-form';
import { getTimelinesQuery } from '@/lib/timeline-queries';

export async function getTimelines(): Promise<
  ActionResult<TimelineItemType[]>
> {
  return await getTimelinesQuery();
}

export async function createTimeline(
  formData: FormData
): Promise<ActionResult<null>> {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, message: '권한이 없습니다.' };
    }

    const raw = extractTimelineFormRaw(formData);
    if (!hasRequiredTimelineFields(raw)) {
      return { success: false, message: '필수 항목을 모두 입력해주세요.' };
    }
    const { type, date, year, place, title } = raw;
    const descriptions = parseTimelineDescriptions(raw.descriptions);

    const imageFile = formData.get('image') as File;

    if (!imageFile || imageFile.size === 0) {
      return {
        success: false,
        message: '이미지는 필수입니다.',
      };
    }

    const imageBlob = await put(
      `timelines/${year}-${title}/image-${imageFile.name}`,
      imageFile,
      { access: 'public' }
    );

    await prisma.timeline.create({
      data: {
        type,
        date,
        year,
        place,
        title,
        descriptions,
        image: imageBlob.url,
      },
    });

    revalidateTag('timelines');

    return {
      success: true,
      message: '타임라인이 성공적으로 생성되었습니다.',
      data: null,
    };
  } catch (error) {
    return {
      success: false,
      message: '타임라인 생성 중 오류가 발생했습니다.',
      error: error instanceof Error ? error.message : '알 수 없는 오류',
    };
  }
}

export async function updateTimeline(
  id: string,
  formData: FormData
): Promise<ActionResult<null>> {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, message: '권한이 없습니다.' };
    }

    const existingTimeline = await prisma.timeline.findUnique({
      where: { id },
    });

    if (!existingTimeline) {
      return { success: false, message: '타임라인을 찾을 수 없습니다.' };
    }

    const raw = extractTimelineFormRaw(formData);
    if (!hasRequiredTimelineFields(raw)) {
      return { success: false, message: '필수 항목을 모두 입력해주세요.' };
    }
    const { type, date, year, place, title } = raw;
    const descriptions = parseTimelineDescriptions(raw.descriptions);

    const updateData: Partial<TimelineItemType> = {
      type: type as TimelineItemType['type'],
      date,
      year,
      place,
      title,
      descriptions,
    };

    const imageFile = formData.get('image') as File | null;

    if (imageFile && imageFile.size > 0) {
      if (existingTimeline.image) {
        try {
          await del(existingTimeline.image);
        } catch (e) {
          console.error('Failed to delete old image:', e);
        }
      }
      const imageBlob = await put(
        `timelines/${type}/image-${imageFile.name}`,
        imageFile,
        { access: 'public' }
      );
      updateData.image = imageBlob.url;
    }

    await prisma.timeline.update({
      where: { id },
      data: updateData,
    });

    revalidateTag('timelines');

    return {
      success: true,
      message: '타임라인이 성공적으로 수정되었습니다.',
      data: null,
    };
  } catch (error) {
    return {
      success: false,
      message: '타임라인 수정 중 오류가 발생했습니다.',
      error: error instanceof Error ? error.message : '알 수 없는 오류',
    };
  }
}

export async function deleteTimeline(id: string): Promise<ActionResult<null>> {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, message: '권한이 없습니다.' };
    }

    const existingTimeline = await prisma.timeline.findUnique({
      where: { id },
    });

    if (!existingTimeline) {
      return { success: false, message: '타임라인을 찾을 수 없습니다.' };
    }

    if (existingTimeline.image) {
      try {
        await del(existingTimeline.image);
      } catch (e) {
        console.error('Failed to delete image blob:', e);
      }
    }

    await prisma.timeline.delete({
      where: { id },
    });

    revalidateTag('timelines');

    return {
      success: true,
      message: '타임라인이 성공적으로 삭제되었습니다.',
      data: null,
    };
  } catch (error) {
    return {
      success: false,
      message: '타임라인 삭제 중 오류가 발생했습니다.',
      error: error instanceof Error ? error.message : '알 수 없는 오류',
    };
  }
}

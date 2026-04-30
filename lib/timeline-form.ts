import { TimelineItemType } from '@/types/timeline';

export type TimelineFormRaw = {
  type: string;
  date: string;
  year: string;
  place: string;
  title: string;
  descriptions: string;
};

export function extractTimelineFormRaw(formData: FormData): TimelineFormRaw {
  return {
    type: (formData.get('type') as string) || '',
    date: (formData.get('date') as string) || '',
    year: (formData.get('year') as string) || '',
    place: (formData.get('place') as string) || '',
    title: (formData.get('title') as string) || '',
    descriptions: (formData.get('descriptions') as string) || '',
  };
}

export function hasRequiredTimelineFields(raw: TimelineFormRaw): boolean {
  return Boolean(raw.type && raw.date && raw.year && raw.place && raw.title);
}

export function parseTimelineDescriptions(value: string): string[] {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

export function mapTimelineItem(raw: {
  id: string;
  type: string;
  year: string;
  date: string;
  place: string;
  title: string;
  descriptions: unknown;
  image: string | null;
}): TimelineItemType {
  return {
    id: raw.id,
    type: raw.type as TimelineItemType['type'],
    year: raw.year,
    date: raw.date,
    place: raw.place,
    title: raw.title,
    descriptions: raw.descriptions as string[],
    image: raw.image ?? '',
  };
}

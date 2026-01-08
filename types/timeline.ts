import { ExperienceRadioType } from './radioGroup';

export type TimelineItemType = {
  id: string;
  type: ExperienceRadioType;
  date: string;
  year: string;
  place: string;
  title: string;
  description: string[];
  image: string;
};

import { ExperienceRadioType } from '@/types/radioGroup';

const getItemReversed = (
  index: number,
  value: ExperienceRadioType
): boolean => {
  switch (value) {
    case 'experience':
      return false;
    case 'certifications':
      return true;
    case 'education':
      return index % 2 !== 0;
  }
};

const getLinePosition = (value: ExperienceRadioType): string => {
  switch (value) {
    case 'experience':
      return 'md:left-[16.67%]';
    case 'education':
      return 'md:left-1/2';
    case 'certifications':
      return 'md:left-[83.33%]';
  }
};

export { getItemReversed, getLinePosition };

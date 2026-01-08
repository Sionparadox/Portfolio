import { ExperienceRadioType } from '@/types/radioGroup';

const getItemReversed = (
  index: number,
  value: ExperienceRadioType
): boolean => {
  if (value === 'experience') {
    return false;
  } else if (value === 'certifications') {
    return true;
  } else {
    return index % 2 !== 0;
  }
};

const getLinePosition = (value: ExperienceRadioType): string => {
  switch (value) {
    case 'experience':
      return 'sm:left-[16.67%]';
    case 'education':
      return 'sm:left-1/2';
    case 'certifications':
      return 'sm:left-[83.33%]';
  }
};

export { getItemReversed, getLinePosition };

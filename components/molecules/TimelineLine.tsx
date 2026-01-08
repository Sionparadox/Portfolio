'use client';

import { ExperienceRadioType } from '@/types/radioGroup';
import { getLinePosition } from '@/utils/timelineUtil';
import { Award, Briefcase, GraduationCap, LucideIcon } from 'lucide-react';
import { motion, MotionValue, useTransform } from 'motion/react';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

type TimelineLineProps = {
  selectedValue: ExperienceRadioType;
  lineHeight: number;
  progress: MotionValue<number>;
};

const getIcon = (selectedValue: ExperienceRadioType): LucideIcon => {
  switch (selectedValue) {
    case 'experience':
      return Briefcase;
    case 'education':
      return GraduationCap;
    case 'certifications':
      return Award;
  }
};
const TimelineLine = ({
  selectedValue,
  lineHeight,
  progress,
}: TimelineLineProps) => {
  const IconComponent = getIcon(selectedValue);

  const height = useTransform(progress, [0, 1], [0, lineHeight]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollBy(0, 1);
      window.scrollBy(0, -1);
    }
  }, [lineHeight]);
  return (
    <div
      className={cn(
        'absolute top-0 left-[16.67%] transition-all duration-500 ease-in-out',
        getLinePosition(selectedValue)
      )}
      style={{
        height: `${lineHeight}px`,
        clipPath: 'inset(0 -24px 0 -24px)',
      }}
    >
      {/* 배경선 */}
      <div className='bg-muted absolute top-0 left-0 h-full w-0.5' />

      {/* 활성선 */}
      <motion.div
        className='absolute top-0 left-0 z-1 w-0.5 origin-top bg-linear-to-b from-cyan-500 to-purple-500'
        style={{ height }}
      />

      {/* 아이콘 원 */}
      <div className='absolute top-0 left-0 h-[calc(100%+48px)] w-0'>
        <div className='sticky top-3/4 z-2 flex h-12 w-12 -translate-x-1/2 -translate-y-full items-center justify-center rounded-full bg-linear-to-br from-cyan-500 to-purple-500 shadow-sm transition-all duration-500 ease-in-out'>
          <IconComponent className='h-6 w-6 text-white' />
        </div>
      </div>
    </div>
  );
};
export default TimelineLine;

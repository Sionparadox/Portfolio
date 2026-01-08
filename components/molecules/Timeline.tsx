import { ExperienceRadioType } from '@/types/radioGroup';
import { TimelineItemType } from '@/types/timeline';
import { getItemReversed } from '@/utils/timelineUtil';
import { useScroll } from 'motion/react';
import { useRef } from 'react';
import TimelineItem from './TimelineItem';
import TimelineLine from './TimelineLine';

type TimelineProps = {
  selectedValue: ExperienceRadioType;
  timelineData: TimelineItemType[];
};

const Timeline = ({ selectedValue, timelineData }: TimelineProps) => {
  const items = timelineData.filter((item) => item.type === selectedValue);
  const lineHeight = items.length * 200;

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 75%'],
  });

  return (
    <div ref={containerRef} className='relative w-full'>
      <div className='relative mx-auto w-full max-w-3xl'>
        <TimelineLine
          selectedValue={selectedValue}
          lineHeight={lineHeight}
          progress={scrollYProgress}
        />

        <div className='relative' style={{ minHeight: `${lineHeight}px` }}>
          {items.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              reversed={getItemReversed(index, selectedValue)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Timeline;

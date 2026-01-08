'use client';

import { getTimelines } from '@/actions/timeline';
import ExperienceRadio from '@/components/molecules/ExperienceRadio';
import Timeline from '@/components/molecules/Timeline';
import { ExperienceRadioType } from '@/types/radioGroup';
import { TimelineItemType } from '@/types/timeline';
import { useEffect, useState } from 'react';

const ExperienceSection = () => {
  const [timelineData, setTimelineData] = useState<TimelineItemType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getTimelines();
      if (result.success && result.data) {
        setTimelineData(result.data);
      }
    };
    fetchData();
  }, []);
  const [selectedValue, setSelectedValue] =
    useState<ExperienceRadioType>('education');

  return (
    <div className='flex w-full flex-col items-center justify-center pt-4'>
      <ExperienceRadio value={selectedValue} onChange={setSelectedValue} />

      <Timeline selectedValue={selectedValue} timelineData={timelineData} />
      <div className='mt-10 h-[80vh] w-full bg-red-500'></div>
    </div>
  );
};

export default ExperienceSection;

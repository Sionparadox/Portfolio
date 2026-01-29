'use client';

import { ExperienceRadioType } from '@/types/radioGroup';
import { TimelineItemType } from '@/types/timeline';
import { useState } from 'react';
import ExperienceRadio from '../molecules/ExperienceRadio';
import Timeline from '../molecules/Timeline';

type ExperienceClientProps = {
  timelineData: TimelineItemType[];
};

const ExperienceClient = ({ timelineData }: ExperienceClientProps) => {
  const [selectedValue, setSelectedValue] =
    useState<ExperienceRadioType>('education');

  return (
    <>
      <ExperienceRadio value={selectedValue} onChange={setSelectedValue} />
      <Timeline selectedValue={selectedValue} timelineData={timelineData} />
    </>
  );
};

export default ExperienceClient;

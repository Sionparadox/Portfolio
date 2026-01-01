'use client';

import ExperienceRadio from '@/components/molecules/ExperienceRadio';
import { ExperienceRadioType } from '@/types/radioGroup';
import { useState } from 'react';

const ExperienceSection = () => {
  const [selectedValue, setSelectedValue] =
    useState<ExperienceRadioType>('education');

  return (
    <div className='flex w-full flex-col items-center justify-center gap-8 pt-4'>
      <ExperienceRadio value={selectedValue} onChange={setSelectedValue} />
    </div>
  );
};

export default ExperienceSection;

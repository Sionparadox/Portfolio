import { ExperienceRadioType } from '@/types/radioGroup';
import { ReactNode } from 'react';
import AccentTitle from './AccentTitle';

type TimelineManagementListProps = {
  type: ExperienceRadioType;
  children: ReactNode;
};

const TimelineManagementList = ({
  type,
  children,
}: TimelineManagementListProps) => {
  return (
    <div className='flex flex-col gap-4'>
      <AccentTitle accentText={type} color='neon' underline as='h2' />
      <div className='flex flex-col gap-2'>{children}</div>
    </div>
  );
};

export default TimelineManagementList;

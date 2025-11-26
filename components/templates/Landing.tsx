'use client';

import { greetingMessage } from '@/constants/greetingMessage';
import { useVisitType } from '../../hooks/useVisitType';
import { ExplosionText } from '../molecules/ExplosionText';

export const Landing = () => {
  const visitType = useVisitType();
  if (!visitType) return <div className='min-h-[100vh] w-full'></div>;
  return (
    <div className='flex min-h-[120vh] flex-col justify-end gap-36 overflow-x-hidden overflow-y-hidden pl-16'>
      <div className='flex w-full flex-col gap-4'>
        <ExplosionText
          className='text-9xl font-bold'
          text={greetingMessage[visitType].title}
        />
        <ExplosionText
          className='text-7xl font-semibold'
          text={greetingMessage[visitType].message}
        />
      </div>
      <div className='overflow-y-visible whitespace-nowrap'>
        <ExplosionText
          className='text-7xl font-semibold'
          text='I want to see you again SionParadox portfolio'
        />
      </div>
    </div>
  );
};

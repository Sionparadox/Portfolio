'use client';

import { greetingMessage } from '@/constants/GreetingMessage';
import { ExplosionText } from '../molecules/ExplosionText';

export const Landing = () => {
  return (
    <div className='-mb-40 overflow-x-hidden overflow-y-hidden pl-16'>
      <div className='flex min-h-[100vh] w-full flex-col justify-end gap-4 pb-32'>
        <ExplosionText
          className='text-9xl font-bold'
          text={greetingMessage['first'].title}
        />
        <ExplosionText
          className='text-7xl font-semibold'
          text={greetingMessage['first'].message}
        />
      </div>
      <div className='flex gap-2 overflow-y-visible whitespace-nowrap'>
        <ExplosionText
          className='text-7xl font-semibold'
          text='I want to see you again SionParadox portfolio'
        />
      </div>
    </div>
  );
};

'use client';

import { greetingMessage } from '@/constants/greetingMessage';
import { useVisitType } from '../../hooks/useVisitType';
import Container from '../atoms/Container';
import { ExplosionText } from '../molecules/ExplosionText';

export const Landing = () => {
  const visitType = useVisitType();
  if (!visitType) return <div className='min-h-[100vh] w-full'></div>;
  return (
    <Container className='flex min-h-[120vh] flex-col justify-end gap-36 overflow-x-hidden overflow-y-hidden'>
      <div className='flex w-full flex-col gap-4'>
        <ExplosionText
          text={greetingMessage[visitType].title}
          className='text-fluid-h1'
        />
        <ExplosionText text={greetingMessage[visitType].message} />
      </div>
      <div className='overflow-y-visible whitespace-nowrap'>
        <ExplosionText text='I want to see you again SionParadox portfolio' />
      </div>
    </Container>
  );
};

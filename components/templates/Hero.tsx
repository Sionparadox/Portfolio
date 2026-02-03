'use client';

import { greetingMessage } from '@/constants/greetingMessage';
import { useVisitType } from '../../hooks/useVisitType';
import Container from '../atoms/Container';
import { ExplosionText } from '../molecules/ExplosionText';
import ScrollDownArrow from '../molecules/ScrollDownArrow';
import ThemePlanet from '../molecules/ThemePlanet';

export const Hero = () => {
  const visitType = useVisitType();

  return (
    <div className='relative h-screen overflow-x-hidden overflow-y-clip'>
      <ThemePlanet />
      <Container className='mb-4 flex h-full flex-col justify-end gap-4 pb-28'>
        <ExplosionText
          text={greetingMessage[visitType].title}
          className='text-fluid-h1'
        />
        <ExplosionText
          text={greetingMessage[visitType].message}
          className='-tracking-widest sm:tracking-normal'
        />
      </Container>
      <div className='absolute top-[100vh] left-0 px-1 whitespace-nowrap sm:px-2 md:px-4 lg:px-6'>
        <ExplosionText text='I want to see you again in my portfolio' />
      </div>
      <ScrollDownArrow />
    </div>
  );
};

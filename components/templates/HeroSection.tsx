'use client';

import { useVisitInfo } from '@/hooks/useVisitType';
import { useState } from 'react';
import { Hero } from '../organisms/Hero';
import Intro from '../organisms/Intro';

const HeroSection = () => {
  const { visitType, visitedToday, ready } = useVisitInfo();
  const [forceIntro, setForceIntro] = useState(false);

  if (!ready) {
    return <div className='h-screen w-full bg-transparent' />;
  }

  const showIntro = forceIntro || !visitedToday;

  return showIntro ? (
    <Intro visitType={visitType} />
  ) : (
    <Hero visitType={visitType} onReplayIntro={() => setForceIntro(true)} />
  );
};

export default HeroSection;

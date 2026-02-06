'use client';

import { useTheme } from '@/hooks/useTheme';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';

const ANIMATION_CONFIG = {
  initial: { opacity: 0, y: 400, scale: 0.4 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -400, scale: 0.5 },
  transition: { duration: 0.8, ease: 'easeInOut' as const },
};

const ThemePlanet = () => {
  const { theme } = useTheme();

  return (
    <div className='pointer-events-none absolute top-0 left-1/2 z-[-5] -translate-x-1/2 -translate-y-2/3 sm:-translate-y-3/4'>
      <AnimatePresence mode='popLayout' initial={false}>
        <motion.div
          key={theme}
          className='relative aspect-square w-[200vw] sm:w-[150vw] md:w-[120vw] lg:w-screen'
          {...ANIMATION_CONFIG}
        >
          <Image
            src={`/img/planet_${theme}.webp`}
            alt={`${theme === 'dark' ? 'Dark' : 'Light'} Planet`}
            fill
            sizes='(max-width: 640px) 200vw, (max-width: 768px) 150vw, (max-width: 1024px) 120vw, 100vw'
            className='animation-duration-[180s] animate-spin object-contain'
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ThemePlanet;

'use client';

import { themeAtom } from '@/atoms/theme';
import { useTheme } from '@/hooks/useTheme';
import { useAtomValue } from 'jotai';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';

const animationProperties = {
  initial: {
    opacity: 0,
    y: 400,
    scale: 0.4,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: -400,
    scale: 0.7,
  },
};

const sizeProps =
  'relative aspect-square w-[200vw] sm:w-[150vw] md:w-[100vw] lg:w-[60vw]';

const ThemePlanet = () => {
  const { mounted } = useTheme();
  const theme = useAtomValue(themeAtom);

  if (!mounted) {
    return null;
  }

  return (
    <div className='pointer-events-none absolute top-0 left-1/2 z-[-5] -translate-x-1/2 -translate-y-1/2'>
      <AnimatePresence mode='popLayout' initial={false}>
        {theme === 'dark' ? (
          <motion.div
            key='planet-dark'
            className={sizeProps}
            initial={animationProperties.initial}
            animate={animationProperties.animate}
            exit={animationProperties.exit}
            transition={{
              duration: 0.4,
              ease: 'easeInOut',
            }}
          >
            <Image
              src='/img/planet_dark.png'
              alt='Dark Planet'
              fill
              sizes='(max-width: 640px) 200vw, (max-width: 768px) 150vw, (max-width: 1024px) 100vw, 60vw'
              className='animation-duration-[180s] animate-spin object-contain'
              priority
            />
          </motion.div>
        ) : (
          <motion.div
            key='planet-light'
            className={sizeProps}
            initial={animationProperties.initial}
            animate={animationProperties.animate}
            exit={animationProperties.exit}
            transition={{
              duration: 0.4,
              ease: 'easeInOut',
            }}
          >
            <Image
              src='/img/planet_light.png'
              alt='Light Planet'
              fill
              sizes='(max-width: 640px) 200vw, (max-width: 768px) 150vw, (max-width: 1024px) 100vw, 60vw'
              className='animation-duration-[180s] animate-spin object-contain'
              priority
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemePlanet;

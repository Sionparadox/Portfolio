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

const PLANET_CONFIG = {
  sizes:
    '(max-width: 640px) 200vw, (max-width: 768px) 150vw, (max-width: 1024px) 120vw, 100vw',
  containerClassName:
    'relative aspect-square w-[200vw] sm:w-[150vw] md:w-[120vw] lg:w-screen',
  imageClassName: 'animation-duration-[180s] animate-spin object-contain',
  previewClassName: 'object-contain opacity-70 blur-sm',
} as const;

const ThemePlanet = () => {
  const { mounted, theme } = useTheme();

  return (
    <div className='pointer-events-none absolute top-0 left-1/2 z-[-5] -translate-x-1/2 -translate-y-2/3 sm:-translate-y-3/4'>
      {mounted ? (
        <AnimatePresence mode='popLayout' initial={false}>
          <motion.div
            key={theme}
            className={PLANET_CONFIG.containerClassName}
            {...ANIMATION_CONFIG}
          >
            <Image
              src={`/img/planet_${theme}.png`}
              alt={`${theme === 'dark' ? 'Dark' : 'Light'} Planet`}
              fill
              sizes={PLANET_CONFIG.sizes}
              className={PLANET_CONFIG.imageClassName}
            />
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className={PLANET_CONFIG.containerClassName}>
          <Image
            src='/img/planet_light.png'
            alt='Light Planet'
            fill
            sizes={PLANET_CONFIG.sizes}
            className={`${PLANET_CONFIG.previewClassName} dark:hidden`}
            priority
          />
          <Image
            src='/img/planet_dark.png'
            alt='Dark Planet'
            fill
            sizes={PLANET_CONFIG.sizes}
            className={`hidden ${PLANET_CONFIG.previewClassName} dark:block`}
            priority
          />
        </div>
      )}
    </div>
  );
};

export default ThemePlanet;

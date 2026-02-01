'use client';

import { useTheme } from '@/hooks/useTheme';
import { motion } from 'motion/react';
import React, { useMemo } from 'react';

const ThemeToggleButton = () => {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = theme === 'dark';

  const radius = '0.5em';
  const facePartStyle: React.CSSProperties = useMemo(
    () => ({
      backfaceVisibility: 'hidden',
      position: 'absolute',
      transformStyle: 'preserve-3d',
    }),
    []
  );

  const sphereShadow = useMemo(
    () => '0.25em 0.25em 0.125em hsl(0,0%,0%,0.3)',
    []
  );

  const sphereBackground = useMemo(
    () => ({
      background: 'hsl(48,90%,50%)',
      boxShadow:
        '-0.25em -0.25em 0.25em hsl(48,90%,40%) inset, 0.1875em 0.1875em 0.25em hsl(48,90%,75%) inset',
      transform: 'translateZ(0)',
    }),
    []
  );

  const faceMarkup = (
    <>
      {/* 앞면: 웃는 얼굴 */}
      <div
        className='absolute inset-0'
        style={{ ...facePartStyle, transform: 'rotateY(0)' }}
      >
        <div
          style={{
            ...facePartStyle,
            border: '0.0625em solid hsl(223,10%,10%)',
            borderRightColor: 'transparent',
            borderBottomColor: 'transparent',
            borderRadius: '50%',
            top: '50%',
            left: '50%',
            width: '0.25em',
            height: '0.25em',
            transform: `translate(-50%,-50%) rotateY(-22.5deg) translateZ(${radius}) rotateZ(45deg)`,
          }}
        />
        <div
          style={{
            ...facePartStyle,
            border: '0.0625em solid hsl(223,10%,10%)',
            borderRightColor: 'transparent',
            borderBottomColor: 'transparent',
            borderRadius: '50%',
            top: '50%',
            left: '50%',
            width: '0.25em',
            height: '0.25em',
            transform: `translate(-50%,-50%) rotateY(22.5deg) translateZ(${radius}) rotateZ(45deg)`,
          }}
        />
        <div
          style={{
            ...facePartStyle,
            borderRadius: '50%',
            backgroundImage:
              'radial-gradient(100% 100% at 50% 100%,hsl(3,90%,50%) 20%,hsl(3,90%,60%) 33%,hsla(3,90%,60%,0) 35%), radial-gradient(100% 100% at 75% 113%,hsl(0,0%,0%) 26%,hsla(0,0%,0%,0) 35%), linear-gradient(hsla(0,0%,0%,0) 50%,hsl(0,0%,0%) 50% 55%,hsl(223,10%,10%) 65%)',
            top: '50%',
            left: '50%',
            width: '0.5em',
            height: '0.5em',
            transform: `translate(-50%,-50%) rotateX(-15deg) translateZ(${radius})`,
          }}
        />
      </div>

      {/* 뒷면: 슬픈 얼굴 */}
      <div
        className='absolute inset-0'
        style={{ ...facePartStyle, transform: 'rotateY(-180deg)' }}
      >
        <div
          style={{
            ...facePartStyle,
            backgroundColor: 'hsl(223,10%,10%)',
            borderRadius: '50%',
            top: '50%',
            left: '50%',
            width: '0.1875em',
            height: '0.1875em',
            transform: `translate(-50%,-50%) rotateY(-22.5deg) translateZ(${radius})`,
          }}
        />
        <div
          style={{
            ...facePartStyle,
            backgroundColor: 'hsl(223,10%,10%)',
            borderRadius: '50%',
            top: '50%',
            left: '50%',
            width: '0.1875em',
            height: '0.1875em',
            transform: `translate(-50%,-50%) rotateY(22.5deg) translateZ(${radius})`,
          }}
        />
        <div
          style={{
            ...facePartStyle,
            border: '0.0625em solid transparent',
            borderTopColor: 'hsl(223,10%,10%)',
            borderRadius: '50%',
            top: '50%',
            left: '50%',
            width: '0.5em',
            height: '0.5em',
            transform: `translate(-50%,0) rotateX(-20deg) translateZ(${radius})`,
          }}
        />
      </div>
    </>
  );

  return (
    <button
      onClick={toggleTheme}
      suppressHydrationWarning
      className='theme-toggle-button relative h-[1.5em] w-[2.5em] cursor-pointer rounded-[0.75em] bg-[hsl(223,10%,80%)] transition-colors duration-500 dark:bg-[hsl(123,90%,40%)]'
    >
      <motion.div
        className='pointer-events-none absolute top-[0.25em] left-[0.25em] h-[1em] w-[1em] overflow-hidden rounded-full transform-3d dark:left-[1.25em]'
        animate={{
          left: isDark ? '1.25em' : '0.25em',
        }}
        transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
        style={{
          boxShadow: sphereShadow,
        }}
      >
        <div
          className='absolute inset-0 rounded-full'
          style={sphereBackground}
        />

        {mounted ? (
          <motion.div
            className='absolute inset-0 transform-3d'
            initial={{ rotateY: isDark ? 180 : 0 }}
            animate={{ rotateY: isDark ? 180 : 0 }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1.5] }}
          >
            {faceMarkup}
          </motion.div>
        ) : (
          <div className='absolute inset-0 transform-3d dark:rotate-y-180'>
            {faceMarkup}
          </div>
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggleButton;

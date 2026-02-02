'use client';

import { useTheme } from '@/hooks/useTheme';
import { motion } from 'motion/react';
import React from 'react';

const RADIUS = '0.5em';
const SPHERE_SHADOW = '0.25em 0.25em 0.125em hsl(0,0%,0%,0.3)';

const facePartStyle: React.CSSProperties = {
  backfaceVisibility: 'hidden',
  position: 'absolute',
  transformStyle: 'preserve-3d',
};

const SPHERE_COLORS = {
  light: {
    background: 'hsl(48, 92%, 55%)',
    boxShadow:
      '-0.12em -0.12em 0.2em hsl(48, 90%, 40%) inset, 0.12em 0.12em 0.2em hsl(48, 90%, 75%) inset',
  },
  dark: {
    background: 'hsl(206, 38%, 80%)',
    boxShadow:
      '-0.12em -0.12em 0.2em hsl(206, 28%, 70%) inset, 0.12em 0.12em 0.2em hsl(206, 55%, 92%) inset',
  },
};

const CloudsBackground = () => (
  <div className='relative h-[0.5em] w-[0.9em]'>
    <div className='absolute top-0 left-[0.15em] h-[0.35em] w-[0.35em] rounded-full bg-white/95 shadow-[0_0_0.15em_rgba(255,255,255,0.5)]' />
    <div className='absolute top-[0.05em] left-[0.35em] h-[0.4em] w-[0.4em] rounded-full bg-white/98 shadow-[0_0_0.2em_rgba(255,255,255,0.6)]' />
    <div className='absolute top-[0.15em] left-0 h-[0.3em] w-[0.3em] rounded-full bg-white/90' />
    <div className='absolute top-[0.18em] left-[0.55em] h-[0.28em] w-[0.28em] rounded-full bg-white/92' />
  </div>
);

const StarsBackground = () => (
  <>
    <div className='absolute top-[0.5em] left-[0.5em] h-[0.15em] w-[0.15em] rounded-full bg-white shadow-[0_0_0.2em_rgba(255,255,255,0.8)]' />
    <div className='absolute top-[0.4em] left-[0.9em] h-[0.1em] w-[0.1em] rounded-full bg-white/90 shadow-[0_0_0.15em_rgba(255,255,255,0.7)]' />
    <div className='absolute top-[0.8em] left-[0.4em] h-[0.12em] w-[0.12em] rounded-full bg-white/85 shadow-[0_0_0.18em_rgba(255,255,255,0.6)]' />
  </>
);

const Face = () => (
  <>
    {/* 앞면: 해 얼굴 */}
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
          transform: `translate(-50%,-50%) rotateY(-22.5deg) translateZ(${RADIUS}) rotateZ(45deg)`,
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
          transform: `translate(-50%,-50%) rotateY(22.5deg) translateZ(${RADIUS}) rotateZ(45deg)`,
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
          transform: `translate(-50%,-50%) rotateX(-15deg) translateZ(${RADIUS})`,
        }}
      />
    </div>

    {/* 뒷면: 달 얼굴 */}
    <div
      className='absolute inset-0'
      style={{ ...facePartStyle, transform: 'rotateY(-180deg)' }}
    >
      <div
        style={{
          ...facePartStyle,
          borderRadius: '50%',
          backgroundImage:
            'radial-gradient(circle at 35% 35%, white 10%, transparent 15%), radial-gradient(circle, hsl(223,10%,10%) 100%, transparent 100%)',
          top: '50%',
          left: '50%',
          width: '0.1875em',
          height: '0.1875em',
          transform: `translate(-50%,-50%) rotateY(-22.5deg) translateZ(${RADIUS})`,
        }}
      />
      <div
        style={{
          ...facePartStyle,
          borderRadius: '50%',
          backgroundImage:
            'radial-gradient(circle at 35% 35%, white 10%, transparent 15%), radial-gradient(circle, hsl(223,10%,10%) 100%, transparent 100%)',
          top: '50%',
          left: '50%',
          width: '0.1875em',
          height: '0.1875em',
          transform: `translate(-50%,-50%) rotateY(22.5deg) translateZ(${RADIUS})`,
        }}
      />
      <div
        style={{
          ...facePartStyle,
          border: '0.0625em solid transparent',
          borderBottomColor: 'hsl(223,10%,10%)',
          borderRadius: '50%',
          top: '50%',
          left: '50%',
          width: '0.5em',
          height: '0.5em',
          transform: `translate(-50%,-70%) rotateX(-20deg) translateZ(${RADIUS})`,
        }}
      />
    </div>
  </>
);

const ThemeToggleButton = () => {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label='테마 전환'
      className='theme-toggle-button-shadow relative h-[1.5em] w-[2.5em] cursor-pointer rounded-[0.75em] bg-sky-300 transition-colors duration-500 dark:bg-blue-900'
    >
      {mounted ? (
        <>
          {/* 실제 컴포넌트 */}
          <div className='absolute inset-0 overflow-hidden rounded-[0.75em]'>
            <motion.div
              className='absolute top-[0.5em] right-[0.15em]'
              initial={{ opacity: isDark ? 0 : 1 }}
              animate={{ opacity: isDark ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <CloudsBackground />
            </motion.div>

            <motion.div
              className='absolute inset-0'
              initial={{ opacity: isDark ? 1 : 0 }}
              animate={{ opacity: isDark ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <StarsBackground />
            </motion.div>
          </div>

          <motion.div
            className='pointer-events-none absolute top-[0.25em] left-[0.25em] h-[1em] w-[1em] overflow-hidden rounded-full transform-3d'
            initial={false}
            animate={{
              left: isDark ? '1.25em' : '0.25em',
              background: isDark
                ? SPHERE_COLORS.dark.background
                : SPHERE_COLORS.light.background,
              boxShadow: isDark
                ? `${SPHERE_COLORS.dark.boxShadow}, ${SPHERE_SHADOW}`
                : `${SPHERE_COLORS.light.boxShadow}, ${SPHERE_SHADOW}`,
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ transform: 'translateZ(0)' }}
          >
            <motion.div
              className='absolute inset-0 transform-3d'
              initial={{ rotateY: isDark ? 180 : 0 }}
              animate={{ rotateY: isDark ? 180 : 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <Face />
            </motion.div>
          </motion.div>
        </>
      ) : (
        <>
          {/* 초기 상태 */}
          <div className='absolute inset-0 overflow-hidden rounded-[0.75em]'>
            <div className='absolute top-[0.5em] right-[0.15em] opacity-100 dark:opacity-0'>
              <CloudsBackground />
            </div>

            <div className='absolute inset-0 opacity-0 dark:opacity-100'>
              <StarsBackground />
            </div>
          </div>

          <div className='pointer-events-none absolute top-[0.25em] left-[0.25em] h-[1em] w-[1em] overflow-hidden rounded-full transform-3d dark:left-[1.25em]'>
            <div
              className='absolute inset-0 rounded-full'
              style={{
                background: 'var(--toggle-sphere-bg)',
                boxShadow: `var(--toggle-sphere-shadow), ${SPHERE_SHADOW}`,
                transform: 'translateZ(0)',
              }}
            />
            <div className='absolute inset-0 transform-3d dark:rotate-y-180'>
              <Face />
            </div>
          </div>
        </>
      )}
    </button>
  );
};

export default ThemeToggleButton;

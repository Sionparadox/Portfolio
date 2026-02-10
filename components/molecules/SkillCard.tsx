'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import GlassCard from '../atoms/GlassCard';

interface SkillCardProps {
  name: string;
  percentage: number;
  image: string;
}

const containerVariants = {
  initial: {},
  active: {},
};

const overlayVariants = {
  initial: { opacity: 0 },
  active: { opacity: 1 },
};

const fadeTransition = { duration: 0.3 };

const SkillCard = ({ name, percentage, image }: SkillCardProps) => {
  const progress = useMotionValue(0);
  const [canHover, setCanHover] = useState(true);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const mq =
      typeof window !== 'undefined'
        ? window.matchMedia('(hover: hover) and (pointer: fine)')
        : null;

    const update = () => setCanHover(mq ? mq.matches : true);
    update();

    if (!mq) return;

    mq.addEventListener('change', update);

    return () => {
      mq.removeEventListener('change', update);
    };
  }, []);

  const handleActive = (active: boolean) => {
    setIsActive(active);
    progress.set(active ? 1 : 0);
  };

  const springProgress = useSpring(progress, {
    stiffness: 80,
    damping: 40,
  });

  const displayValue = useTransform(springProgress, (v) =>
    Math.round(v * percentage)
  );

  const pathLength = useTransform(
    springProgress,
    (v) => v * (percentage / 100)
  );

  const nameClassName = `text-sm font-bold transition-colors duration-300 ${
    isActive
      ? 'bg-linear-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent'
      : ''
  }`;

  return (
    <GlassCard className='h-32 w-32'>
      <motion.div
        className='flex h-full w-full flex-col items-center justify-center gap-2'
        variants={containerVariants}
        initial='initial'
        whileHover={canHover ? 'active' : undefined}
        onHoverStart={canHover ? () => handleActive(true) : undefined}
        onHoverEnd={canHover ? () => handleActive(false) : undefined}
        whileInView={!canHover ? 'active' : undefined}
        viewport={!canHover ? { amount: 1 } : undefined}
        onViewportEnter={!canHover ? () => handleActive(true) : undefined}
        onViewportLeave={!canHover ? () => handleActive(false) : undefined}
        tabIndex={0}
        onFocus={() => handleActive(true)}
        onBlur={() => handleActive(false)}
      >
        <div className='relative h-20 w-20 overflow-hidden rounded-full'>
          <Image
            src={image}
            alt={name}
            fill
            className='z-1 object-contain p-4'
          />

          <motion.div
            variants={overlayVariants}
            transition={fadeTransition}
            className='text-foreground absolute inset-0 z-2 flex items-center justify-center rounded-full bg-white/30 text-xl font-black backdrop-blur-xs dark:bg-black/30 dark:text-white'
          >
            <motion.span>{displayValue}</motion.span>%
          </motion.div>

          <svg
            className='absolute inset-0 z-3 -rotate-90'
            viewBox='0 0 100 100'
          >
            <motion.circle
              cx='50'
              cy='50'
              r='48'
              stroke='currentColor'
              strokeWidth='4'
              fill='transparent'
              strokeLinecap='round'
              className='text-primary'
              style={{ pathLength }}
              variants={overlayVariants}
              transition={fadeTransition}
            />
          </svg>
        </div>

        <div className={nameClassName}>{name}</div>
      </motion.div>
    </GlassCard>
  );
};

export default SkillCard;

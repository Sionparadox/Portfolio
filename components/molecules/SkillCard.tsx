'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import Image from 'next/image';
import GlassCard from '../atoms/GlassCard';

interface SkillCardProps {
  name: string;
  percentage: number;
  image: string;
}

const SkillCard = ({ name, percentage, image }: SkillCardProps) => {
  const progress = useMotionValue(0);

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

  return (
    <GlassCard className='h-32 w-32'>
      <motion.div
        className='group flex h-full w-full flex-col items-center justify-center gap-2'
        initial='initial'
        whileHover='hover'
        onHoverStart={() => progress.set(1)}
        onHoverEnd={() => progress.set(0)}
      >
        <div className='relative h-20 w-20 overflow-hidden rounded-full'>
          <Image
            src={image}
            alt={name}
            fill
            className='z-1 object-contain p-4'
          />

          <motion.div
            variants={{
              initial: { opacity: 0 },
              hover: { opacity: 1 },
            }}
            transition={{ duration: 0.3 }}
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
              variants={{
                initial: { opacity: 0 },
                hover: { opacity: 1 },
              }}
              transition={{ duration: 0.3 }}
            />
          </svg>
        </div>

        <div className='text-sm font-bold transition-colors duration-300 group-hover:bg-linear-to-r group-hover:from-cyan-500 group-hover:to-purple-500 group-hover:bg-clip-text group-hover:text-transparent'>
          {name}
        </div>
      </motion.div>
    </GlassCard>
  );
};

export default SkillCard;

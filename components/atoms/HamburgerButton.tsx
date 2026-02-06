'use client';

import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

const HamburgerButton = ({
  isOpen,
  onClick,
  className,
}: HamburgerButtonProps) => {
  const variant = isOpen ? 'opened' : 'closed';

  const top = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: 45,
      translateY: 2,
    },
  };

  const center = {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
    },
  };

  const bottom = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: -45,
      translateY: -2,
    },
  };

  const lineProps = {
    stroke: 'currentColor',
    strokeWidth: 2.5,
    strokeLinecap: 'round' as const,
    vectorEffect: 'non-scaling-stroke' as const,
    initial: 'closed',
    animate: variant,
    transition: {
      duration: 0.5,
      ease: [0.77, 0.2, 0.05, 1.0] as [number, number, number, number],
    },
  };

  const unitHeight = 6;
  const unitWidth = 6;

  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
      aria-expanded={isOpen}
      className={cn('relative flex cursor-pointer', className)}
    >
      <motion.svg
        viewBox={`0 0 ${unitWidth} ${unitHeight}`}
        overflow='visible'
        preserveAspectRatio='none'
        width={24}
        height={24}
      >
        <motion.line
          x1='0'
          x2={unitWidth}
          y1='0'
          y2='0'
          variants={top}
          {...lineProps}
        />
        <motion.line
          x1='0'
          x2={unitWidth}
          y1='2'
          y2='2'
          variants={center}
          {...lineProps}
        />
        <motion.line
          x1='0'
          x2={unitWidth}
          y1='4'
          y2='4'
          variants={bottom}
          {...lineProps}
        />
      </motion.svg>
    </button>
  );
};

export default HamburgerButton;

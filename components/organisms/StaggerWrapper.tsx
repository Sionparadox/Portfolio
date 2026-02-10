'use client';

import { motion, type Variants } from 'motion/react';
import { ReactNode } from 'react';

interface StaggerWrapperProps {
  children: ReactNode;
  className?: string;
}

const WRAPPER_VARIANTS: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.4 },
  },
};

export const StaggerWrapper = ({
  children,
  className,
}: StaggerWrapperProps) => {
  return (
    <motion.div
      className={className}
      variants={WRAPPER_VARIANTS}
      initial='hidden'
      whileInView='visible'
      viewport={{ amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

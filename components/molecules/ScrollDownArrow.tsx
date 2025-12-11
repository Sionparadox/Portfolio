'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { IoChevronDown } from 'react-icons/io5';

export const ScrollDownArrow = () => {
  const { scrollYProgress } = useScroll({ offset: ['0vh', '50vh'] });
  const arrowOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{ opacity: arrowOpacity }}
      className='fixed bottom-10 left-1/2 -translate-x-1/2 animate-bounce md:bottom-6'
    >
      <IoChevronDown className='text-foreground h-8 w-8' />
    </motion.div>
  );
};

export default ScrollDownArrow;

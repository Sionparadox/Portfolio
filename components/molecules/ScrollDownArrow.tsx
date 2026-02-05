'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { IoChevronDown } from 'react-icons/io5';
import { Button } from '../atoms/Button';

export const ScrollDownArrow = ({
  onReplayIntro,
}: {
  onReplayIntro?: () => void;
}) => {
  const { scrollYProgress } = useScroll({ offset: ['0vh', '30vh'] });
  const arrowOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const pointerEvents = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['auto', 'none', 'none']
  );

  return (
    <motion.div style={{ opacity: arrowOpacity, pointerEvents }}>
      <IoChevronDown className='text-foreground fixed bottom-10 left-1/2 h-8 w-8 -translate-x-1/2 md:bottom-6' />
      <div className='fixed right-0 bottom-4'>
        <Button
          onClick={onReplayIntro}
          variant='plain'
          disabled={!onReplayIntro}
        >
          Replay Intro
        </Button>
      </div>
    </motion.div>
  );
};

export default ScrollDownArrow;

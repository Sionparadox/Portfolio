'use client';

import { motion } from 'motion/react';

const Logo = () => (
  <motion.svg
    className='h-9 w-24 md:h-12 md:w-32 lg:h-[3.75rem] lg:w-40'
    viewBox='0 0 120 60'
    xmlns='http://www.w3.org/2000/svg'
    whileHover='hover'
    initial='hidden'
  >
    <defs>
      <symbol id='star' viewBox='-8 -8 16 16'>
        <path
          d='M0,-8 L2.4,-2.4 L8,-2.4 L3.2,1.6 L4.8,7.2 L0,4 L-4.8,7.2 L-3.2,1.6 L-8,-2.4 L-2.4,-2.4 Z'
          fill='#FFCC00'
          stroke='#FFCC00'
          strokeWidth='0.5'
        />
      </symbol>
    </defs>
    <text
      x='60'
      y='50'
      fontFamily='Paperozi'
      fontSize='48'
      fontWeight='900'
      textAnchor='middle'
      fill='currentColor'
    >
      Sion
    </text>
    <motion.line
      x1='4'
      y1='56'
      x2='116'
      y2='56'
      stroke='#FFCC00'
      strokeWidth='4'
      variants={{
        hidden: {
          pathLength: 0,
        },
        hover: {
          pathLength: 1,
        },
      }}
      transition={{
        duration: 0.8,
        ease: 'easeInOut',
      }}
    />
    <motion.g
      style={{
        transformBox: 'fill-box',
        transformOrigin: 'center',
      }}
      variants={{ hover: { rotate: 360 } }}
      transition={{
        duration: 0.8,
        ease: 'easeInOut',
      }}
    >
      <g transform='translate(31, 1)'>
        <use href='#star' width='22.2' height='22.2' />
      </g>
    </motion.g>
  </motion.svg>
);

export default Logo;

'use client';

import { TimelineItemType } from '@/types/timeline';
import { getLinePosition } from '@/utils/timelineUtil';
import { motion } from 'motion/react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import TimelineCard from './TimelineCard';

type TimelineItemProps = {
  item: TimelineItemType;
  reversed: boolean;
};

const ITEM_HEIGHT = 200;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const desktopItemVariants = (direction: number) => ({
  hidden: { opacity: 0, x: direction },
  visible: { opacity: 1, x: 0 },
});

const mobileItemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const TimelineItem = ({ item, reversed }: TimelineItemProps) => {
  const linePositionClass = getLinePosition(item.type);

  return (
    <motion.div
      className='relative flex w-full items-center'
      style={{ height: `${ITEM_HEIGHT}px` }}
      variants={containerVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ margin: '0px 0px -25% 0px', amount: 0.3 }}
    >
      {/* 모바일 */}
      <div className='flex w-full items-center md:hidden'>
        <motion.span
          className='text-foreground text-xs font-semibold'
          style={{ width: 'calc(16.67% - 26px)' }}
          variants={mobileItemVariants}
        >
          {item.year}
        </motion.span>

        <motion.div
          className='grow'
          style={{ marginLeft: '52px' }}
          variants={mobileItemVariants}
        >
          <TimelineCard item={item} variant='mobile' />
        </motion.div>
      </div>

      {/* 데스크탑 */}
      <div
        className={cn(
          'absolute top-0 bottom-0 hidden w-0 md:block',
          linePositionClass
        )}
      >
        <div
          className={cn(
            'absolute top-1/2 flex w-[300px] -translate-y-1/2',
            reversed ? 'left-10 justify-start' : 'right-10 justify-end'
          )}
        >
          <motion.div
            className='flex flex-col items-center gap-2 whitespace-nowrap'
            variants={desktopItemVariants(reversed ? 32 : -32)}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className='border-glass-border flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border bg-white shadow-lg'>
              <Image
                src={item.image}
                alt={`${item.title} 로고`}
                width={40}
                height={40}
                className='h-full w-full object-cover'
              />
            </div>
            <span
              className='text-sm font-medium'
              aria-label={`연도: ${item.year}`}
            >
              {item.year}
            </span>
          </motion.div>
        </div>

        <div
          className={cn(
            'absolute top-1/2 flex w-[500px] -translate-y-1/2',
            reversed ? 'right-10 justify-end' : 'left-10 justify-start'
          )}
        >
          <motion.div
            variants={desktopItemVariants(reversed ? -32 : 32)}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <TimelineCard item={item} variant='desktop' className='w-80' />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineItem;

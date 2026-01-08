'use client';

import { TimelineItemType } from '@/types/timeline';
import { getLinePosition } from '@/utils/timelineUtil';
import { Building2, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type TimelineItemProps = {
  item: TimelineItemType;
  reversed: boolean;
};

const TimelineItem = ({ item, reversed }: TimelineItemProps) => {
  const linePositionClass = getLinePosition(item.type);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const desktopItemVariants = (direction: number) => ({
    hidden: { opacity: 0, x: direction },
    visible: { opacity: 1, x: 0 },
  });
  const mobileItemVariants = () => ({
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  });

  return (
    <motion.div
      className='relative flex h-[200px] w-full items-center'
      variants={containerVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ margin: '0px 0px -25% 0px', amount: 0.3 }}
    >
      {/* 모바일 */}
      <div className='flex w-full items-center justify-between sm:hidden'>
        <motion.span
          className='text-foreground w-8 text-xs font-medium'
          variants={mobileItemVariants()}
        >
          {item.year}
        </motion.span>
        <div className='w-16' />

        <motion.div className='flex-1' variants={mobileItemVariants()}>
          <div className='bg-card text-card-foreground hover:border-primary hover:text-foreground cursor-pointer rounded-lg border p-4 text-start shadow-lg transition-all duration-300'>
            <h3 className='text-foreground text-base font-semibold'>
              {item.title}
            </h3>
            <div className='flex items-center gap-2'>
              <Calendar size={14} className='text-foreground' />
              <p className='text-sm'>{item.date}</p>
            </div>
            <div className='mb-1 flex items-center gap-2'>
              <Building2 size={14} className='text-foreground' />
              <p className='text-sm'>{item.place}</p>
            </div>

            {item.description.map((description) => (
              <p className='text-sm' key={description.slice(0, 10)}>
                {'•'} {description}
              </p>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 데스크탑 */}
      <div
        className={cn(
          'absolute top-0 bottom-0 hidden w-0 sm:block',
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
            <div className='bg-glass-background border-glass-border flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border shadow-lg'>
              <Image src={item.image} alt={item.title} width={40} height={40} />
            </div>
            <span className='text-sm font-medium'>{item.year}</span>
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
            <div className='bg-card text-card-foreground hover:border-primary hover:text-foreground w-80 cursor-pointer rounded-lg border p-4 text-start shadow-lg transition-all duration-300 hover:scale-[1.02]'>
              <h3 className='text-foreground text-lg font-semibold'>
                {item.title}
              </h3>
              <div className='flex items-center gap-2'>
                <Calendar size={14} className='text-foreground' />
                <p className='text-xs'>{item.date}</p>
              </div>
              <div className='mb-1 flex items-center gap-2'>
                <Building2 size={14} className='text-foreground' />
                <p className='text-xs'>{item.place}</p>
              </div>

              {item.description.map((description) => (
                <p
                  className='text-sm leading-tight'
                  key={description.slice(0, 10)}
                >
                  {'•'} {description}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineItem;

'use client';

import {
  greetingMessage,
  greetingMessageType,
} from '@/constants/greetingMessage';
import { motion, useScroll, useTransform, Variants } from 'motion/react';
import Image from 'next/image';
import { useRef } from 'react';

type IntroProps = {
  visitType: greetingMessageType;
};

const TRANSFORM_ORIGIN = 'center 60%';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.04,
    },
  },
};

const Intro = ({ visitType }: IntroProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 2.5]);
  const blurOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const messageScale = useTransform(scrollYProgress, [0, 1], [0.6, 1.4]);
  const messageOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  const headerCoverZIndex = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    [40, 40, -1]
  );

  const titleText = greetingMessage[visitType].title;
  const messageText = greetingMessage[visitType].message;
  const letters = titleText.split('');

  return (
    <section
      ref={wrapperRef}
      className='relative h-[150lvh] w-full sm:h-[200lvh]'
      aria-label='인트로 섹션'
    >
      {/* 헤더 클릭 방지용 투명 커버 */}
      <motion.div
        className='fixed top-0 right-0 left-0 h-16 w-full sm:h-24'
        style={{ zIndex: headerCoverZIndex }}
        aria-hidden='true'
      />
      <div className='pointer-events-none sticky top-0 z-50 h-lvh w-full overflow-hidden'>
        <div className='pointer-events-none absolute inset-0 z-0 flex items-center justify-center'>
          <motion.div
            className='px-4 text-center'
            style={{
              scale: messageScale,
              opacity: messageOpacity,
              transformOrigin: TRANSFORM_ORIGIN,
            }}
          >
            <motion.h1
              className='text-fluid-h1 text-foreground/90 flex justify-center font-semibold'
              variants={containerVariants}
              initial='hidden'
              animate='visible'
              aria-label={titleText}
            >
              {letters.map((letter, index) => (
                <motion.span
                  key={`${letter}-${index}`}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.1,
                  }}
                  className='inline-block'
                  aria-hidden='true'
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </motion.h1>
            <p className='text-foreground/80 mx-auto mt-3 max-w-2xl text-base sm:text-lg md:text-xl'>
              {messageText}
            </p>
          </motion.div>
        </div>
        <div className='pointer-events-none relative h-full w-full'>
          <motion.div
            className='absolute inset-0 z-0 backdrop-blur-sm'
            style={{ opacity: blurOpacity }}
            aria-hidden='true'
          />
          <motion.div
            className='relative h-full w-full'
            style={{
              scale,
              transformOrigin: TRANSFORM_ORIGIN,
            }}
          >
            {/* 모바일: iPhone 이미지 */}
            <Image
              src='/iphone.png'
              alt={`${titleText} - 포트폴리오 배경 이미지`}
              fill
              priority
              sizes='(max-width: 768px) 100vw, 1px'
              className='z-10 object-cover md:hidden'
            />
            {/* 데스크톱: MacBook 이미지 */}
            <Image
              src='/macbook.png'
              alt={`${titleText} - 포트폴리오 배경 이미지`}
              fill
              priority
              sizes='(min-width: 769px) 100vw, 1px'
              className='z-10 hidden object-cover md:block'
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Intro;

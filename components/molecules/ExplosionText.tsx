'use client';

import { randomFloat } from '@/utils/random';
import { motion, MotionValue, useScroll, useTransform } from 'motion/react';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';

type ExplosionLetterProps = {
  char: string;
  scrollYProgress: MotionValue<number>;
  ySpeed: number;
  rotation: number;
};

const ExplosionLetter = ({
  char,
  scrollYProgress,
  ySpeed,
  rotation,
}: ExplosionLetterProps) => {
  // 숫자(number)로만 먼저 보간을 계산합니다. (성능 최적화)
  const yValue = useTransform(scrollYProgress, [0, 1], [0, -(ySpeed * 100)]);
  // 계산된 숫자에 vh 단위를 붙여줍니다.
  const y = useTransform(yValue, (val) => `${val}vh`);

  // 회전
  const rotate = useTransform(scrollYProgress, [0, 0.5], [0, rotation]);

  return (
    <motion.span
      style={{
        display: 'inline-block',
        y,
        rotate,
        willChange: 'transform', // GPU 가속을 강제하여 스크롤 버벅임 방지
      }}
      className='pr-1 whitespace-pre'
    >
      {char}
    </motion.span>
  );
};

type ExplosionTextProps = {
  text: string;
  className?: string;
};

export const ExplosionText = ({ text, className }: ExplosionTextProps) => {
  const { scrollYProgress } = useScroll({ offset: ['0vh', '100vh'] });

  const letterAnimations = useMemo(() => {
    return text.split('').map(() => ({
      ySpeed: randomFloat(0.7, 2.0), // Y축 상승 속도
      rotation: randomFloat(-60, 60), // 기울기
    }));
  }, [text]);

  const letters = text.split('').map((char, i) => {
    const { ySpeed, rotation } = letterAnimations[i];

    return (
      <ExplosionLetter
        key={i}
        char={char}
        scrollYProgress={scrollYProgress}
        ySpeed={ySpeed}
        rotation={rotation}
      />
    );
  });

  return (
    <div className={cn('text-fluid-h2 pointer-events-none', className)}>
      <span>{letters}</span>
    </div>
  );
};

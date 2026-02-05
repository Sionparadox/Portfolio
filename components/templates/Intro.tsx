'use client';

import {
  greetingMessage,
  greetingMessageType,
} from '@/constants/greetingMessage';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type IntroProps = {
  visitType: greetingMessageType;
};

const Intro = ({ visitType }: IntroProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const [blurOpacity, setBlurOpacity] = useState(1);
  const [messageScale, setMessageScale] = useState(0.6);
  const [messageOpacity, setMessageOpacity] = useState(0);

  useEffect(() => {
    const updateScale = () => {
      if (!wrapperRef.current) {
        return;
      }

      const start = wrapperRef.current.offsetTop;
      const end = start + wrapperRef.current.offsetHeight - window.innerHeight;
      const progress =
        end <= start
          ? 1
          : Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)));

      setScale(1 + progress * 1.2);
      setBlurOpacity(1 - progress);
      setMessageScale(0.6 + progress * 1.2);
      setMessageOpacity(progress);
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) {
        return;
      }
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateScale();
      });
    };

    updateScale();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateScale);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  return (
    <section
      ref={wrapperRef}
      className='pointer-events-none relative h-[200vh] w-full'
    >
      <div className='sticky top-0 z-50 h-screen w-full overflow-hidden'>
        <div className='absolute inset-0 z-0 flex items-center justify-center'>
          <div
            className='text-center'
            style={{
              transform: `scale(${messageScale})`,
              opacity: messageOpacity,
              transformOrigin: 'center 60%',
              willChange: 'transform, opacity',
            }}
          >
            <p className='text-fluid-h1 font-semibold text-white/90'>
              {greetingMessage[visitType].title}
            </p>
            <p className='mt-3 text-base text-white/80 sm:text-lg md:text-xl'>
              {greetingMessage[visitType].message}
            </p>
          </div>
        </div>
        <div className='relative h-full w-full'>
          <div
            className='pointer-events-none absolute inset-0 z-0 backdrop-blur-sm'
            style={{ opacity: blurOpacity }}
          />
          <Image
            src='/macbook.png'
            alt='Intro Image'
            fill
            priority
            className='relative z-10 object-cover'
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'center 60%',
              willChange: 'transform',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Intro;

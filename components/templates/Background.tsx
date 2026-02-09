'use client';

import useDebounce from '@/hooks/useDebounce';
import { useTheme } from '@/hooks/useTheme';
import type { ThemeType } from '@/types/worker';
import { getCurrentThemeFromDOM } from '@/utils/theme';
import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const workerRef = useRef<Worker | null>(null);
  const isInitializedRef = useRef(false);
  const lastWidthRef = useRef(0);

  const { theme, mounted } = useTheme();

  const handleResize = useDebounce(() => {
    const width = window.innerWidth;
    const height = window.screen.height;
    const pixelRatio = window.devicePixelRatio || 1;

    if (width !== lastWidthRef.current) {
      lastWidthRef.current = width;

      // CSS와 동일하게 캔버스 스타일 고정
      if (canvasRef.current) {
        canvasRef.current.style.width = `${width}px`;
        canvasRef.current.style.height = `${height}px`;
      }

      workerRef.current?.postMessage({
        type: 'resize',
        width,
        height,
        pixelRatio,
      });
    }
  }, 100);

  // Worker 초기화
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isInitializedRef.current) return;
    if (
      typeof window === 'undefined' ||
      !window.Worker ||
      !window.OffscreenCanvas
    )
      return;

    isInitializedRef.current = true;
    // 초기 너비 설정
    lastWidthRef.current = window.innerWidth;

    const worker = new Worker(
      new URL('../../workers/background.worker.ts', import.meta.url),
      { type: 'module' }
    );
    workerRef.current = worker;

    const width = window.innerWidth;
    const height = window.screen.height;
    const pixelRatio = window.devicePixelRatio || 1;

    // 초기 스타일 설정
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const offscreen = canvas.transferControlToOffscreen();
    worker.postMessage(
      {
        type: 'init',
        canvas: offscreen,
        width,
        height,
        pixelRatio,
        // DOM에서 이미 적용한 테마
        theme: getCurrentThemeFromDOM(),
      },
      [offscreen]
    );

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, [handleResize]); // handleResize 의존성 추가

  // 테마 변경 감지
  useEffect(() => {
    if (!workerRef.current || !mounted) return; // 마운트 전에는 메시지 전송 차단

    workerRef.current.postMessage({
      type: 'theme-change',
      theme: theme as ThemeType,
    });
  }, [theme, mounted]);

  return (
    <motion.canvas
      ref={canvasRef}
      className='bg-background pointer-events-none fixed top-0 left-0 -z-10'
      // 마운트 전에는 투명도를 0으로 두어 hydration mismatch를 방지
      initial={{ opacity: 0 }}
      animate={{ opacity: mounted ? 1 : 0 }}
      transition={{ duration: 1 }}
    />
  );
}

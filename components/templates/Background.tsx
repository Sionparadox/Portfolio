'use client';

import { useTheme } from '@/hooks/useTheme';
import type { ThemeType } from '@/types/worker';
import { getCurrentThemeFromDOM } from '@/utils/theme';
import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const workerRef = useRef<Worker | null>(null);
  const isInitializedRef = useRef(false);

  const { theme, mounted } = useTheme();

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

    const worker = new Worker(
      new URL('../../workers/background.worker.ts', import.meta.url),
      { type: 'module' }
    );
    workerRef.current = worker;

    // 이전 크기를 저장하여 실제 변화가 있을 때만 리사이즈
    let lastWidth = window.innerWidth;

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const pixelRatio = window.devicePixelRatio || 1;

      // 모바일 브라우저 UI(주소창/하단바) 변화에 따른 리사이즈 무시
      const isWidthChanged = width !== lastWidth;

      if (isWidthChanged) {
        lastWidth = width;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        worker.postMessage({ type: 'resize', width, height, pixelRatio });
      }
    };

    const width = window.innerWidth;
    const height = window.innerHeight;
    const pixelRatio = window.devicePixelRatio || 1;
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
        // DOM에서 이미 적용된 테마를 읽어옵니다 (layout.tsx의 blocking script가 설정함)
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
  }, []);

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
      className='bg-background pointer-events-none fixed inset-0 -z-10'
      // 마운트 전에는 투명도를 0으로 두어 hydration mismatch를 방지
      initial={{ opacity: 0 }}
      animate={{ opacity: mounted ? 1 : 0 }}
      transition={{ duration: 1 }}
    />
  );
}

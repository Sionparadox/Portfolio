'use client';

import { themeAtom } from '@/atoms/theme';
import type { ThemeType, WorkerMessage } from '@/types/worker';
import { useAtomValue } from 'jotai';
import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';

// 초기 테마 가져오기 (SSR 안전)
function getInitialTheme(): ThemeType {
  if (typeof window === 'undefined') return 'dark';
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const workerRef = useRef<Worker | null>(null);
  const isInitializedRef = useRef(false);

  // themeAtom을 직접 구독 (mounted 조건 없이 실제 테마값)
  const theme = useAtomValue(themeAtom);

  // Worker 초기화 (한 번만 실행)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isInitializedRef.current) return;

    // 브라우저 환경 체크
    if (typeof window === 'undefined' || !window.Worker) return;

    // OffscreenCanvas 지원 체크
    if (typeof OffscreenCanvas === 'undefined') {
      console.warn('OffscreenCanvas is not supported in this browser');
      return;
    }

    isInitializedRef.current = true;

    // Worker 생성
    const worker = new Worker(
      new URL('../../workers/background.worker.ts', import.meta.url),
      { type: 'module' }
    );
    workerRef.current = worker;

    // Canvas 크기 설정
    const width = window.innerWidth;
    const height = window.innerHeight;
    const pixelRatio = window.devicePixelRatio || 1;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // OffscreenCanvas로 변환 및 Worker에 전송 (초기 테마 포함)
    const offscreen = canvas.transferControlToOffscreen();
    const initMessage: WorkerMessage = {
      type: 'init',
      canvas: offscreen,
      width,
      height,
      pixelRatio,
      theme: getInitialTheme(),
    };
    worker.postMessage(initMessage, [offscreen]);

    // 리사이즈 핸들러
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const pixelRatio = window.devicePixelRatio || 1;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const resizeMessage: WorkerMessage = {
        type: 'resize',
        width,
        height,
        pixelRatio,
      };
      worker.postMessage(resizeMessage);
    };

    window.addEventListener('resize', handleResize);

    // 클린업
    return () => {
      window.removeEventListener('resize', handleResize);
      if (workerRef.current) {
        const stopMessage: WorkerMessage = { type: 'stop' };
        workerRef.current.postMessage(stopMessage);
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  // 테마 변경 감지 및 Worker에 전송
  useEffect(() => {
    // Worker가 초기화되지 않았으면 스킵
    if (!workerRef.current) return;

    const themeMessage: WorkerMessage = {
      type: 'theme-change',
      theme: theme as ThemeType,
    };
    workerRef.current.postMessage(themeMessage);
  }, [theme]);

  return (
    <motion.canvas
      ref={canvasRef}
      className='pointer-events-none fixed inset-0 -z-10'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    />
  );
}

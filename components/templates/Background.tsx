'use client';

import type { WorkerMessage } from '@/types/worker';
import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 브라우저 환경 체크
    if (typeof window === 'undefined' || !window.Worker) return;

    // OffscreenCanvas 지원 체크
    if (typeof OffscreenCanvas === 'undefined') {
      console.warn('OffscreenCanvas is not supported in this browser');
      return;
    }

    // Worker 생성
    const worker = new Worker(
      new URL('../../workers/background.worker.ts', import.meta.url),
      { type: 'module' }
    );
    workerRef.current = worker;

    // Canvas 크기 설정 및 OffscreenCanvas로 전환
    const updateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const pixelRatio = window.devicePixelRatio || 1;

      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      return { width, height, pixelRatio };
    };

    const { width, height, pixelRatio } = updateSize();

    // OffscreenCanvas로 변환 및 Worker에 전송
    const offscreen = canvas.transferControlToOffscreen();
    const initMessage: WorkerMessage = {
      type: 'init',
      canvas: offscreen,
      width,
      height,
      pixelRatio,
    };
    worker.postMessage(initMessage, [offscreen]);

    // 리사이즈 핸들러
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const pixelRatio = window.devicePixelRatio || 1;

      // OffscreenCanvas로 전환 후에는 원본 canvas 크기 변경 불가
      // 스타일만 업데이트
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

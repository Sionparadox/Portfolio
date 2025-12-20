'use client';

import { useRef } from 'react';

export default function useThrottle<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number
): [T, () => number, () => boolean] {
  const lastCallRef = useRef<number>(0);

  const throttledFn = ((...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCallRef.current >= delay) {
      lastCallRef.current = now;
      callback(...args);
      return true;
    }
    return false;
  }) as T & { (): boolean };

  const getRemainingTime = () => {
    const now = Date.now();
    const elapsed = now - lastCallRef.current;
    return Math.max(0, delay - elapsed);
  };

  const isThrottled = () => {
    return getRemainingTime() > 0;
  };

  return [throttledFn, getRemainingTime, isThrottled];
}

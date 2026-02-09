'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useDebounce<T extends (...args: any[]) => any>(
  value: T,
  delay: number
): (...args: Parameters<T>) => void;

function useDebounce<T>(value: T, delay: number): T;

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(() => value);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fnRef = useRef<T>(value);

  useEffect(() => {
    fnRef.current = value;
  }, [value]);

  useEffect(() => {
    if (typeof value === 'function') return;

    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  const debouncedFn = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (...args: any[]) => {
      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        if (typeof fnRef.current === 'function') {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (fnRef.current as any)(...args);
        }
      }, delay);
    },
    [delay]
  );

  if (typeof value === 'function') {
    return debouncedFn;
  }

  return debouncedValue;
}

export default useDebounce;

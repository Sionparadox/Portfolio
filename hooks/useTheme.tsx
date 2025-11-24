import { mountedAtom } from '@/atoms/mounted';
import {
  storedThemeAtom,
  systemThemeTriggerAtom,
  themeAtom,
} from '@/atoms/theme';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';

// 시스템 테마 변경 감지 훅
export const useSystemThemeDetection = () => {
  const setSystemThemeTrigger = useSetAtom(systemThemeTriggerAtom);
  const storedTheme = useAtomValue(storedThemeAtom);

  useEffect(() => {
    // 선택한 테마가 있으면 무시
    if (storedTheme !== null) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      // 리렌더링
      setSystemThemeTrigger((prev) => !prev);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [storedTheme, setSystemThemeTrigger]);
};

export const useTheme = () => {
  const theme = useAtomValue(themeAtom);
  const setTheme = useSetAtom(themeAtom);
  const mounted = useAtomValue(mountedAtom);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return {
    theme: mounted ? theme : 'dark',
    toggleTheme,
    mounted,
  };
};

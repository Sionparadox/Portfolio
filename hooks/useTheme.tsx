import { mountedAtom } from '@/atoms/mounted';
import {
  storedThemeAtom,
  systemThemeTriggerAtom,
  themeAtom,
} from '@/atoms/theme';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';

// 시스템 테마 변경 감지 훅
export const useSystemThemeDetection = () => {
  const setSystemThemeTrigger = useSetAtom(systemThemeTriggerAtom);
  const storedTheme = useAtomValue(storedThemeAtom);

  useEffect(() => {
    if (storedTheme !== null) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      setSystemThemeTrigger((prev) => !prev);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [storedTheme, setSystemThemeTrigger]);
};

// 메인 테마 제어 훅
export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  const mounted = useAtomValue(mountedAtom);

  const toggleTheme = () => {
    document.documentElement.classList.add('theme-transition-disabled');

    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    requestAnimationFrame(() => {
      document.documentElement.classList.remove('theme-transition-disabled');
    });
  };

  return {
    theme: mounted ? theme : 'light',
    toggleTheme,
    mounted,
  };
};

'use client';

import { themeAtom } from '@/atoms/theme';
import { useSystemThemeDetection } from '@/hooks/useTheme';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useAtomValue(themeAtom);
  useSystemThemeDetection();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return <>{children}</>;
};

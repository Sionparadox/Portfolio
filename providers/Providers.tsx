'use client';

import { mountedAtom } from '@/atoms/mounted';
import { Provider } from 'jotai';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { ThemeProvider } from './ThemeProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const setMounted = useSetAtom(mountedAtom);

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  return (
    <Provider>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
};

'use client';

import { Provider } from 'jotai';
import { MountedProvider } from './MountedProvider';
import { ThemeProvider } from './ThemeProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider>
      <MountedProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </MountedProvider>
    </Provider>
  );
};

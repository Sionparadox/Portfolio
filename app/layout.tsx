import { defaultMetadata, defaultViewport } from '@/config/metadata';
import localFont from 'next/font/local';
import React from 'react';
import Background from '../components/templates/Background';
import { Providers } from '../providers/Providers';
import './global.css';

const paperlogy = localFont({
  src: [
    {
      path: '../public/fonts/Paperlogy/Paperlogy-4Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Paperlogy/Paperlogy-5Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Paperlogy/Paperlogy-6SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Paperlogy/Paperlogy-7Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Paperlogy/Paperlogy-9Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
  fallback: ['sans-serif'],
});

export const metadata = defaultMetadata;
export const viewport = defaultViewport;
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const stored = localStorage.getItem('theme');
                const cleanTheme = stored ? stored.replace(/"/g, '') : null;
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const theme = (cleanTheme === 'light' || cleanTheme === 'dark') ? cleanTheme : systemTheme;
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${paperlogy.className} bg-background flex flex-col`}>
        <Providers>
          <Background />
          <main className='flex w-full grow flex-col'>{children}</main>
        </Providers>
      </body>
    </html>
  );
}

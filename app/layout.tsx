import React from 'react';
import Footer from '../components/organisms/Footer';
import Header from '../components/organisms/Header';
import { Providers } from '../providers/Providers';
import './global.css';

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
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const theme = stored === 'light' || stored === 'dark' ? stored : systemTheme;
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
      <body className='font-paperlogy flex min-h-screen flex-col'>
        <Providers>
          <Header />
          <main className='mt-24 flex-grow'>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

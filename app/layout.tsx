import React from 'react';
import Header from '../components/organisms/Header';
import './global.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' className='dark'>
      <body className='font-paperlogy'>
        <Header />
        <main className='mt-24'>{children}</main>
      </body>
    </html>
  );
}

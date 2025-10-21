import React from 'react';
import Footer from '../components/organisms/Footer';
import Header from '../components/organisms/Header';
import './global.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' className='dark'>
      <body className='font-paperlogy flex min-h-screen flex-col'>
        <Header />
        <main className='mt-24 flex-grow'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

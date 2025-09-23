import React from 'react';
import './global.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className='font-paperlogy'>{children}</body>
    </html>
  );
}

'use client';

import Header from '@/components/organisms/Header';

export default function Home() {
  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center'>
      <Header />
      <div className='text-8xl'>Content</div>
    </div>
  );
}

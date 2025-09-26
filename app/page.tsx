'use client';

import { Button } from '@/components/atoms/Button';
import Logo from '@/components/atoms/Logo';
import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <div className='min-h-screen'>
      <div className='flex min-h-screen items-center justify-center text-8xl'>
        Home
        <div className='flex flex-col gap-2'>
          <Button variant='default'>Default</Button>
          <Button variant='destructive'>Destructive</Button>
          <Button variant='secondary'>Secondary</Button>
          <Button variant='ghost'>Ghost</Button>
          <Button variant='outline'>Outline</Button>
          <Button variant='link'>Link</Button>
          <Button variant='default'>
            Long text Long text Long text Long text
          </Button>
          <Link href='/'>
            <Logo />
          </Link>
        </div>
      </div>
    </div>
  );
}

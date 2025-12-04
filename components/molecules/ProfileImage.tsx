'use client';

import { cn } from '@/lib/utils';
import CircleImage from './CircleImage';

type ProfileImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

const ProfileImage = ({
  src,
  alt,
  width,
  height,
  className,
}: ProfileImageProps) => {
  return (
    <div className={cn('group relative aspect-square w-full', className)}>
      <svg
        className='absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100'
        viewBox='0 0 100 100'
      >
        <circle
          cx='50'
          cy='50'
          r='49'
          fill='none'
          stroke='currentColor'
          strokeWidth='0.5'
          strokeDasharray='15 8 25 5 10 12 20 6 8 15'
          className='text-primary origin-center animate-spin [animation-duration:8s]'
        />
        <circle
          cx='50'
          cy='50'
          r='46'
          fill='none'
          stroke='currentColor'
          strokeWidth='0.3'
          strokeDasharray='20 10 8 15 30 5 12 8'
          className='text-primary/60 origin-center animate-spin [animation-direction:reverse] [animation-duration:12s]'
        />
      </svg>

      <div className='absolute inset-[6%]'>
        <CircleImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          className='grayscale transition-[filter] duration-300 group-hover:grayscale-0'
        />
      </div>
    </div>
  );
};

export default ProfileImage;

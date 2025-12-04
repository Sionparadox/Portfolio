import Image from 'next/image';
import { cn } from '@/lib/utils';

const CircleImage = ({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'relative aspect-square w-full overflow-hidden rounded-full border-2',
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className='object-cover'
        priority
      />
    </div>
  );
};

export default CircleImage;

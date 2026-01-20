import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import GlassCard from '../atoms/GlassCard';

type ProjectNavigationCardProps = {
  direction: 'prev' | 'next';

  title: string;
  slug: string;
  imageSrc: string;
};

const ProjectNavigationCard = ({
  direction,

  title,
  slug,
  imageSrc,
}: ProjectNavigationCardProps) => {
  const isPrev = direction === 'prev';
  const Icon = isPrev ? ChevronLeft : ChevronRight;
  const label = isPrev ? 'Previous Project' : 'Next Project';

  return (
    <Link href={`/projects/${slug}`} className='group w-full'>
      <GlassCard>
        <div
          className={`text-muted-foreground flex items-center gap-2 px-1 py-2 sm:h-20 sm:px-2 ${isPrev ? 'flex-row' : 'flex-row-reverse'}`}
        >
          <Icon className='text-muted-foreground size-6 shrink-0 transition-all duration-300 group-hover:scale-120 group-hover:text-purple-500 sm:size-8' />

          <div className='relative aspect-square w-8 shrink-0 sm:w-10'>
            <Image
              src={imageSrc}
              alt={`${label} Icon`}
              fill
              className='object-cover grayscale transition-all duration-300 group-hover:grayscale-0'
            />
          </div>

          <div className={isPrev ? 'text-start' : 'text-end'}>
            <p className='group-hover:text-foreground m-0 hidden text-sm tracking-tight transition-all duration-300 sm:block'>
              {label}
            </p>
            <p className='group-hover:text-foreground m-0 text-xs tracking-tight capitalize transition-all duration-300 sm:hidden'>
              {direction}
            </p>
            <p className='text-foreground m-0 line-clamp-1 text-sm font-semibold text-ellipsis transition-all duration-300 group-hover:bg-linear-to-r group-hover:from-cyan-500 group-hover:to-purple-500 group-hover:bg-clip-text group-hover:text-transparent sm:text-base'>
              {title}
            </p>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
};

export default ProjectNavigationCard;

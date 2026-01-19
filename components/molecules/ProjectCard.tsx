import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Badge from '../atoms/Badge';
import { Button } from '../atoms/Button';

const ProjectCard = () => {
  return (
    <div className='bg-card group flex flex-col overflow-hidden rounded-xl border'>
      <div className='relative aspect-video overflow-hidden'>
        <Image
          src='/img/Rose.jpeg'
          alt='Thumbnail'
          fill
          className='object-cover'
        />
      </div>
      <div className='relative flex-1 space-y-3 p-6 text-start'>
        <Badge
          label='Web'
          variant='inverted'
          className='absolute -top-2.5 left-5'
        />
        <h3 className='text-xl font-bold'>Title</h3>
        <p className='text-muted-foreground line-clamp-2 leading-relaxed'>
          Description Description Description Description Description
          Description Description Description Description Description
          Description Description Description Description{' '}
        </p>
        <div className='flex flex-wrap gap-2'>
          <Badge label='React' />
          <Badge label='Next.js' />
          <Badge label='Tailwind CSS' />
        </div>
      </div>
      <div className='p-6 pt-0'>
        <Button variant='inverted' className='w-full'>
          Detail
          <ArrowUpRight />
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;

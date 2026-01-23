import { ProjectItemType } from '@/types/project';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Badge from '../atoms/Badge';

const ProjectListCard = ({ project }: { project: ProjectItemType }) => {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className='group bg-card hover:border-primary flex w-full items-center gap-2 overflow-hidden rounded-xl border p-2 transition-all duration-300 sm:gap-4'
    >
      <div className='relative aspect-video w-20 shrink-0 overflow-hidden sm:w-24'>
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className='object-cover transition-transform duration-300 group-hover:scale-105'
        />
      </div>
      <div className='flex grow flex-col text-left'>
        <Badge
          label={project.category}
          className='hidden w-fit sm:block'
          variant='inverted'
        />
        <h3 className='font-bold sm:text-lg'>{project.title}</h3>
        <p className='text-muted-foreground line-clamp-2 text-xs leading-relaxed sm:text-sm'>
          {project.overview}
        </p>
      </div>

      <ArrowUpRight className='group-hover:text-foreground text-muted-foreground size-6 shrink-0 transition-colors duration-300' />
    </Link>
  );
};

export default ProjectListCard;

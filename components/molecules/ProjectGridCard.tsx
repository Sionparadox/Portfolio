import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ProjectItemType } from '../../types/project';
import Badge from '../atoms/Badge';
import { Button } from '../atoms/Button';

const ProjectGridCard = ({ project }: { project: ProjectItemType }) => {
  return (
    <div className='bg-card group hover:border-primary flex flex-col overflow-hidden rounded-xl border transition-all duration-300'>
      <div className='relative aspect-video overflow-hidden'>
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className='object-cover transition-transform duration-500 group-hover:scale-110'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          priority={project.order <= 2}
        />
        <div className='absolute inset-0 bg-linear-to-b from-transparent to-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-80 dark:to-black/50' />
      </div>
      <div className='relative flex-1 space-y-3 p-6 text-start'>
        <Badge
          label={project.category}
          variant='inverted'
          className='absolute -top-2.5 left-5'
        />
        <h3 className='text-xl font-bold'>{project.title}</h3>
        <p className='text-muted-foreground line-clamp-2 leading-relaxed'>
          {project.overview}
        </p>
        <div className='flex flex-wrap gap-2'>
          {project.techStack.slice(0, 6).map((tech) => (
            <Badge key={tech} label={tech} />
          ))}
          {project.techStack.length > 6 && (
            <Badge label={`+${project.techStack.length - 6}`} />
          )}
        </div>
      </div>
      <div className='p-6 pt-0'>
        <Button variant='inverted' className='w-full' asChild>
          <Link href={`/projects/${project.slug}`}>
            More Detail
            <ArrowUpRight />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ProjectGridCard;

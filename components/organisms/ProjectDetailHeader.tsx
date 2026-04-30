import { ProjectItemType } from '@/types/project';
import Image from 'next/image';
import Container from '../atoms/Container';

interface ProjectDetailHeaderProps {
  project: ProjectItemType;
}

const ProjectDetailHeader = ({ project }: ProjectDetailHeaderProps) => {
  return (
    <div className='vertical-fade flex h-100 w-screen items-center justify-center overflow-hidden'>
      <Image
        src={project.thumbnail}
        alt={`${project.title} Thumbnail`}
        fill
        className='-z-10 object-cover blur-xs'
        fetchPriority='high'
        priority
        quality={60}
        sizes='(max-width: 768px) 100vw, (max-width: 1536px) 100vw, 85vw'
      />

      <Container className='relative z-10 text-center'>
        <h1 className='mb-2 text-3xl font-bold sm:mb-4 sm:text-5xl'>
          {project.title}
        </h1>
        <p className='line-clamp-6 leading-relaxed font-medium'>
          {project.overview}
        </p>
      </Container>
    </div>
  );
};

export default ProjectDetailHeader;

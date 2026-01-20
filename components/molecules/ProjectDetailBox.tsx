import { ProjectItemType } from '@/types/project';
import { Calendar, Clock, CodeXml, ExternalLink, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getDuration } from '../../utils/getDuration';
import Badge from '../atoms/Badge';
import { Button } from '../atoms/Button';
import InfoRow from '../atoms/InfoRow';

//TODO: hover 효과
type ProjectDetailBoxProps = {
  className?: string;
  project: ProjectItemType;
};

const ProjectDetailBox = ({ className, project }: ProjectDetailBoxProps) => {
  const duration = getDuration(project.startDate, project.endDate);
  return (
    <div
      className={cn(
        'bg-card relative z-0 overflow-hidden rounded-2xl',
        className
      )}
    >
      <div className='absolute -inset-full -z-20 animate-[spin_4s_linear_infinite] bg-conic from-cyan-500 via-purple-500 to-cyan-500' />

      <div className='bg-card absolute inset-1 -z-10 rounded-2xl' />
      <div className='relative z-10 flex flex-col items-center gap-4 p-4 py-5'>
        <div className='relative flex aspect-square h-20 items-center justify-center rounded-lg'>
          <Image
            src={project.icon}
            alt='Project Info'
            fill
            className='object-cover'
          />
          <div className='absolute -inset-2 -z-10 bg-conic from-cyan-300 via-purple-300 to-cyan-300 blur dark:from-cyan-500 dark:via-purple-500 dark:to-cyan-500' />
        </div>
        <h3 className='text-lg font-bold'>{project.title}</h3>
        <div className='w-full border-b' />
        <div className='flex w-full flex-col gap-3'>
          <InfoRow
            Icon={Calendar}
            label='시작'
            value={project.startDate.toLocaleDateString()}
          />
          <InfoRow
            Icon={Calendar}
            label='종료'
            value={
              project.endDate ? project.endDate.toLocaleDateString() : '진행중'
            }
          />
          <InfoRow Icon={Clock} label='기간' value={duration} />
          <InfoRow Icon={Users} label='인원' value={`${project.teamSize}명`} />
        </div>
        <div className='w-full border-b' />
        <div className='flex w-full flex-wrap items-center justify-center gap-2'>
          {project.techStack.map((tech) => (
            <Badge key={tech} label={tech} />
          ))}
        </div>
        <div className='w-full border-b' />
        <div className='flex w-full gap-3'>
          <Button
            variant='inverted'
            className='w-full'
            asChild
            disabled={!project.link}
          >
            <Link href={project.link || ''} target='_blank'>
              Live
              <ExternalLink />
            </Link>
          </Button>
          <Button
            variant='inverted'
            className='w-full'
            asChild
            disabled={!project.github}
          >
            <Link href={project.github || ''} target='_blank'>
              Source
              <CodeXml />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailBox;

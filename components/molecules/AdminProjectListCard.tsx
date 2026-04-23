'use client';

import Badge from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { ProjectItemType } from '@/types/project';
import { Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface AdminProjectListCardProps {
  project: ProjectItemType;
  onEdit: (project: ProjectItemType) => void;
  onDelete: (id: string, title: string) => void;
}

const AdminProjectListCard = ({
  project,
  onEdit,
  onDelete,
}: AdminProjectListCardProps) => {
  return (
    <div className='bg-card hover:border-primary group flex w-full items-center gap-4 overflow-hidden rounded-xl border p-3 transition-all duration-300'>
      <div className='relative aspect-video w-24 shrink-0 overflow-hidden rounded-md border sm:w-32'>
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className='object-cover'
          sizes='(max-width: 640px) 96px, 128px'
        />
      </div>

      <div className='flex grow flex-col text-left'>
        <div className='mb-1 flex items-center gap-2'>
          <Badge label={project.category} variant='inverted' />
          {project.featured && <Badge label='Featured' variant='primary' />}
        </div>

        <h3 className='flex items-center gap-2 font-bold sm:text-lg'>
          {project.title}
        </h3>

        <p className='text-muted-foreground line-clamp-1 text-sm'>
          {project.overview}
        </p>
      </div>

      <div className='flex shrink-0 flex-col gap-2 sm:flex-row'>
        <Button variant='outline' size='icon' onClick={() => onEdit(project)}>
          <Pencil />
        </Button>
        <Button
          variant='destructive'
          size='icon'
          onClick={() => onDelete(project.id, project.title)}
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
};

export default AdminProjectListCard;

'use client';

import { ProjectDetailItemType } from '@/types/project';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

type ProjectDetailListItemProps = {
  detail: ProjectDetailItemType;
  isOpen: boolean;
  onToggle: () => void;
};

const ProjectDetailListItem = ({
  detail,
  isOpen,
  onToggle,
}: ProjectDetailListItemProps) => {
  const descriptionText = detail.description || '설명이 없습니다.';

  return (
    <div className='rounded-md transition-colors'>
      <button
        type='button'
        onClick={onToggle}
        className='text-foreground/95 hover:text-foreground focus-visible:ring-ring hover:bg-muted/50 flex w-full cursor-pointer items-center justify-between rounded-md px-1.5 py-1.5 text-left transition-colors focus-visible:ring-2 focus-visible:outline-none'
      >
        <span className={isOpen ? 'font-semibold' : undefined}>
          {detail.title}
        </span>
        <ChevronDown
          className={`size-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`grid transition-all duration-200 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className='overflow-hidden'>
          <div className='text-foreground/90 border-primary/40 bg-card/5 mx-2 mb-2 border-l-2 py-1 pr-1 pl-3 text-sm leading-6'>
            <p>{descriptionText}</p>
            {detail.link ? (
              <a
                href={detail.link}
                target='_blank'
                rel='noreferrer'
                className='text-foreground decoration-primary/70 mt-2 inline-block text-[0.9rem] underline underline-offset-4'
              >
                관련 블로그 글 보러가기
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

type ProjectDetailListProps = {
  items: ProjectDetailItemType[];
};

const ProjectDetailList = ({ items }: ProjectDetailListProps) => {
  const [openItemId, setOpenItemId] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <p className='text-muted-foreground text-sm'>등록된 항목이 없습니다.</p>
    );
  }

  return (
    <ul className='space-y-2'>
      {items.map((item) => (
        <li key={item.id} className='relative'>
          <ProjectDetailListItem
            detail={item}
            isOpen={openItemId === item.id}
            onToggle={() =>
              setOpenItemId((prev) => (prev === item.id ? null : item.id))
            }
          />
        </li>
      ))}
    </ul>
  );
};

export default ProjectDetailList;

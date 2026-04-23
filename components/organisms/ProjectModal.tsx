'use client';

import { createProject, updateProject } from '@/actions/project';
import { Button } from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import LabelInput from '@/components/molecules/LabelInput';
import { ProjectItemType } from '@/types/project';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectToEdit?: ProjectItemType | null;
}

const ProjectModal = ({
  isOpen,
  onClose,
  projectToEdit,
}: ProjectModalProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    setIsEditMode(!!projectToEdit);
  }, [projectToEdit]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    let result;
    if (isEditMode && projectToEdit) {
      result = await updateProject(projectToEdit.id, formData);
    } else {
      result = await createProject(formData);
    }

    if (result.success) {
      router.refresh();
      form.reset();
      onClose();
    } else {
      alert(result.message);
    }

    setLoading(false);
  };

  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm'>
      <div className='bg-popover w-full max-w-3xl overflow-hidden rounded-2xl border shadow-xl'>
        <div className='bg-muted/30 flex items-center justify-between border-b p-4'>
          <h2 className='text-lg font-bold'>
            {isEditMode ? '프로젝트 수정' : '프로젝트 추가'}
          </h2>
          <Button variant='ghost' size='iconSm' onClick={onClose}>
            <X />
          </Button>
        </div>

        <form
          onSubmit={handleSubmit}
          className='max-h-[80vh] space-y-6 overflow-y-auto p-6'
        >
          <div className='grid grid-cols-2 gap-4'>
            <LabelInput
              label='프로젝트명 *'
              name='title'
              required
              placeholder='프로젝트명'
              defaultValue={projectToEdit?.title}
            />

            <LabelInput
              label='슬러그 *'
              name='slug'
              required
              placeholder='영어로 입력'
              defaultValue={projectToEdit?.slug}
            />
          </div>

          <LabelInput
            label='한 줄 소개 *'
            name='overview'
            required
            placeholder='간단한 한줄 소개'
            defaultValue={projectToEdit?.overview}
          />

          <LabelInput
            label='상세 설명 *'
            name='description'
            required
            multiline
            placeholder='프로젝트에 대한 상세한 설명을 적어주세요.'
            className='h-32'
            defaultValue={projectToEdit?.description}
          />

          <div className='grid grid-cols-3 gap-4'>
            <LabelInput
              label='카테고리 *'
              name='category'
              required
              placeholder='Ex) Web'
              defaultValue={projectToEdit?.category}
            />
            <LabelInput
              label='팀 규모'
              name='teamSize'
              type='number'
              defaultValue={projectToEdit?.teamSize || 1}
            />
            <LabelInput
              label='역할'
              name='role'
              placeholder='Ex) Frontend Developer'
              defaultValue={projectToEdit?.role || ''}
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <LabelInput
              label='시작일 *'
              name='startDate'
              type='date'
              required
              defaultValue={formatDate(projectToEdit?.startDate)}
            />
            <LabelInput
              label='종료일'
              name='endDate'
              type='date'
              defaultValue={formatDate(projectToEdit?.endDate)}
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <LabelInput
              label='GitHub 링크'
              name='github'
              type='url'
              placeholder='https://github.com/...'
              defaultValue={projectToEdit?.github || ''}
            />
            <LabelInput
              label='배포 링크'
              name='link'
              type='url'
              placeholder='https://...'
              defaultValue={projectToEdit?.link || ''}
            />
          </div>

          <LabelInput
            label='기술 스택'
            name='techStack'
            placeholder='React, Next.js, TailwindCSS (콤마로 구분)'
            defaultValue={projectToEdit?.techStack?.join(', ')}
          />

          <LabelInput
            label='기여한 점'
            name='contributions'
            multiline
            className='h-24'
            placeholder='줄바꿈(Enter)으로 구분해서 입력하세요.'
            defaultValue={projectToEdit?.contributions?.join('\n')}
          />

          <LabelInput
            label='배운 점'
            name='insights'
            multiline
            className='h-24'
            placeholder='줄바꿈(Enter)으로 구분해서 입력하세요.'
            defaultValue={projectToEdit?.insights?.join('\n')}
          />

          <div className='bg-muted/50 grid grid-cols-2 gap-4 rounded-xl border border-dashed p-4'>
            <div>
              <label className='mb-1.5 block text-sm font-semibold'>
                썸네일 이미지 {isEditMode ? '' : '*'}
              </label>
              {isEditMode && (
                <p className='text-muted-foreground mb-2 text-xs'>
                  선택하지 않으면 기존 이미지가 유지됩니다.
                </p>
              )}
              <Input
                name='thumbnail'
                type='file'
                accept='image/*'
                required={!isEditMode}
                className='file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer file:mr-4 file:rounded-full file:border-0 file:px-3 file:py-1 file:text-xs file:font-semibold'
              />
            </div>
            <div>
              <label className='mb-1.5 block text-sm font-semibold'>
                아이콘 이미지 {isEditMode ? '' : '*'}
              </label>
              {isEditMode && (
                <p className='text-muted-foreground mb-2 text-xs'>
                  선택하지 않으면 기존 이미지가 유지됩니다.
                </p>
              )}
              <Input
                name='icon'
                type='file'
                accept='image/*'
                required={!isEditMode}
                className='file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer file:mr-4 file:rounded-full file:border-0 file:px-3 file:py-1 file:text-xs file:font-semibold'
              />
            </div>
          </div>

          <div className='flex items-center justify-between border-t pt-4'>
            <label className='flex cursor-pointer items-center gap-2'>
              <input
                name='featured'
                type='checkbox'
                defaultChecked={projectToEdit?.featured}
                className='text-primary focus:ring-primary h-4 w-4 rounded border-gray-300'
              />
              <span className='text-sm font-semibold'>
                주요 프로젝트 노출 여부
              </span>
            </label>

            <div className='flex items-center gap-2'>
              <label className='text-sm font-semibold'>정렬 순서</label>
              <Input
                name='order'
                type='number'
                defaultValue={projectToEdit?.order || 0}
                className='w-20'
              />
            </div>
          </div>

          <div className='flex justify-end gap-2 pt-4'>
            <Button type='button' variant='outline' onClick={onClose}>
              취소
            </Button>
            <Button type='submit' disabled={loading}>
              {loading ? '저장 중...' : isEditMode ? '수정하기' : '추가하기'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;

'use client';

import { createProject, updateProject } from '@/actions/project';
import { Button } from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import LabelInput from '@/components/molecules/LabelInput';
import { ProjectDetailType, ProjectItemType } from '@/types/project';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectToEdit?: ProjectItemType | null;
}

type ProjectDetailFormItem = {
  id: string;
  title: string;
  link: string;
  description: string;
};

const createDetailItem = (): ProjectDetailFormItem => ({
  id:
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`,
  title: '',
  link: '',
  description: '',
});

const mapProjectDetails = (
  project: ProjectItemType | null | undefined,
  type: ProjectDetailType
): ProjectDetailFormItem[] => {
  if (!project) return [createDetailItem()];

  const matched = project.details
    .filter((detail) => detail.type === type)
    .sort((a, b) => a.order - b.order)
    .map((detail) => ({
      id: detail.id,
      title: detail.title,
      link: detail.link ?? '',
      description: detail.description ?? '',
    }));

  return matched.length > 0 ? matched : [createDetailItem()];
};

const ProjectModal = ({
  isOpen,
  onClose,
  projectToEdit,
}: ProjectModalProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEditMode = !!projectToEdit;
  const [contributionDetails, setContributionDetails] = useState<
    ProjectDetailFormItem[]
  >(() => mapProjectDetails(projectToEdit, 'contribution'));
  const [insightDetails, setInsightDetails] = useState<ProjectDetailFormItem[]>(
    () => mapProjectDetails(projectToEdit, 'insight')
  );

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setContributionDetails(mapProjectDetails(projectToEdit, 'contribution'));
      setInsightDetails(mapProjectDetails(projectToEdit, 'insight'));
    });

    return () => cancelAnimationFrame(frameId);
  }, [projectToEdit, isOpen]);

  if (!isOpen) return null;

  const updateDetailItem = (
    type: ProjectDetailType,
    itemId: string,
    field: keyof Omit<ProjectDetailFormItem, 'id'>,
    value: string
  ) => {
    const setter =
      type === 'contribution' ? setContributionDetails : setInsightDetails;

    setter((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, [field]: value } : item
      )
    );
  };

  const addDetailItem = (type: ProjectDetailType) => {
    const setter =
      type === 'contribution' ? setContributionDetails : setInsightDetails;
    setter((prev) => [...prev, createDetailItem()]);
  };

  const removeDetailItem = (type: ProjectDetailType, itemId: string) => {
    const setter =
      type === 'contribution' ? setContributionDetails : setInsightDetails;

    setter((prev) => {
      const next = prev.filter((item) => item.id !== itemId);
      return next.length > 0 ? next : [createDetailItem()];
    });
  };

  const serializeDetailItems = (items: ProjectDetailFormItem[]) => {
    return JSON.stringify(
      items
        .map((item) => ({
          title: item.title.trim(),
          link: item.link.trim(),
          description: item.description.trim(),
        }))
        .filter((item) => item.title)
    );
  };

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

  const renderDetailFields = (
    type: ProjectDetailType,
    items: ProjectDetailFormItem[],
    title: string
  ) => {
    return (
      <div className='space-y-3 rounded-xl border p-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-sm font-semibold'>{title}</h3>
          <Button
            type='button'
            variant='outline'
            onClick={() => addDetailItem(type)}
          >
            항목 추가
          </Button>
        </div>
        <div className='space-y-4'>
          {items.map((item, index) => (
            <div
              key={item.id}
              className='bg-muted/40 space-y-3 rounded-lg border p-3'
            >
              <div className='flex items-center justify-between'>
                <p className='text-sm font-medium'>항목 {index + 1}</p>
                <Button
                  type='button'
                  variant='ghost'
                  size='iconSm'
                  onClick={() => removeDetailItem(type, item.id)}
                >
                  <X className='size-4' />
                </Button>
              </div>
              <LabelInput
                label='제목 *'
                name={`${type}-title-${index}`}
                placeholder='라인에 보여질 제목'
                value={item.title}
                onChange={(e) =>
                  updateDetailItem(type, item.id, 'title', e.target.value)
                }
              />
              <LabelInput
                label='관련 링크'
                name={`${type}-link-${index}`}
                placeholder='https://...'
                value={item.link}
                onChange={(e) =>
                  updateDetailItem(type, item.id, 'link', e.target.value)
                }
              />
              <LabelInput
                label='설명'
                name={`${type}-description-${index}`}
                multiline
                className='h-20'
                placeholder='hover 팝아웃에 노출할 설명'
                value={item.description}
                onChange={(e) =>
                  updateDetailItem(type, item.id, 'description', e.target.value)
                }
              />
            </div>
          ))}
        </div>
      </div>
    );
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

          <input
            type='hidden'
            name='contributionDetails'
            value={serializeDetailItems(contributionDetails)}
            readOnly
          />
          <input
            type='hidden'
            name='insightDetails'
            value={serializeDetailItems(insightDetails)}
            readOnly
          />

          {renderDetailFields('contribution', contributionDetails, '기여한 점')}
          {renderDetailFields('insight', insightDetails, '배운 점')}

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

'use client';

import { createTimeline, updateTimeline } from '@/actions/timeline';
import { Button } from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import LabelInput from '@/components/molecules/LabelInput';
import { ExperienceRadioType } from '@/types/radioGroup';
import { TimelineItemType } from '@/types/timeline';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface TimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  timelineToEdit?: TimelineItemType | null;
}

const TIMELINE_TYPES: { value: ExperienceRadioType; label: string }[] = [
  { value: 'experience', label: 'Experience (경력)' },
  { value: 'education', label: 'Education (학력)' },
  { value: 'certifications', label: 'Certifications (자격증)' },
];

const TimelineModal = ({
  isOpen,
  onClose,
  timelineToEdit,
}: TimelineModalProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEditMode = !!timelineToEdit;

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    let result;
    if (isEditMode && timelineToEdit) {
      result = await updateTimeline(timelineToEdit.id, formData);
    } else {
      result = await createTimeline(formData);
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

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm'>
      <div className='bg-popover w-full max-w-2xl overflow-hidden rounded-2xl border shadow-xl'>
        <div className='bg-muted/30 flex items-center justify-between border-b p-4'>
          <h2 className='text-lg font-bold'>
            {isEditMode ? '타임라인 수정' : '타임라인 추가'}
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
            <div>
              <label className='mb-1.5 block text-sm font-semibold'>
                타입 *
              </label>
              <select
                name='type'
                required
                defaultValue={timelineToEdit?.type || 'experience'}
                className='border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full appearance-none rounded-md border px-3 py-2 pr-10 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                }}
              >
                {TIMELINE_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <LabelInput
              label='연도 *'
              name='year'
              required
              placeholder='숫자만 입력'
              defaultValue={timelineToEdit?.year}
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <LabelInput
              label='제목 *'
              name='title'
              required
              placeholder='활동(자격증) 명'
              defaultValue={timelineToEdit?.title}
            />

            <LabelInput
              label='장소 / 소속 *'
              name='place'
              required
              placeholder='주관기관, 회사명'
              defaultValue={timelineToEdit?.place}
            />
          </div>

          <LabelInput
            label='기간 (Date) *'
            name='date'
            required
            placeholder='YYYY/MM - YYYY/MM'
            defaultValue={timelineToEdit?.date}
          />

          <LabelInput
            label='상세 내용 *'
            name='descriptions'
            required
            multiline
            className='h-32'
            placeholder='줄바꿈(Enter)으로 구분해서 입력하세요.'
            defaultValue={timelineToEdit?.descriptions?.join('\n')}
          />

          <div className='bg-muted/50 rounded-xl border border-dashed p-4'>
            <label className='mb-1.5 block text-sm font-semibold'>
              이미지 {isEditMode ? '' : '*'}
            </label>
            {isEditMode && (
              <p className='text-muted-foreground mb-2 text-xs'>
                선택하지 않으면 기존 이미지가 유지됩니다.
              </p>
            )}
            <Input
              name='image'
              type='file'
              accept='image/*'
              required={!isEditMode}
              className='file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer file:mr-4 file:rounded-full file:border-0 file:px-3 file:py-1 file:text-xs file:font-semibold'
            />
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

export default TimelineModal;

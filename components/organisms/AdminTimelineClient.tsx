'use client';

import { deleteTimeline } from '@/actions/timeline';
import { Button } from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import AccentTitle from '@/components/molecules/AccentTitle';
import TimelineManagementCard from '@/components/molecules/TimelineManagementCard';
import TimelineManagementList from '@/components/molecules/TimelineManagementList';
import TimelineModal from '@/components/organisms/TimelineModal';
import { ExperienceRadioType } from '@/types/radioGroup';
import { TimelineItemType } from '@/types/timeline';
import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

const TIMELINE_TYPES: ExperienceRadioType[] = [
  'experience',
  'education',
  'certifications',
];

const AdminTimelineClient = ({
  timelines,
}: {
  timelines: TimelineItemType[];
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timelineToEdit, setTimelineToEdit] = useState<TimelineItemType | null>(
    null
  );
  const [, startTransition] = useTransition();
  const router = useRouter();

  const handleEdit = (timeline: TimelineItemType) => {
    setTimelineToEdit(timeline);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimelineToEdit(null);
  };

  const handleDelete = async (id: string, title: string) => {
    if (
      confirm(
        `정말로 타임라인 "${title}"을(를) 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`
      )
    ) {
      startTransition(async () => {
        const result = await deleteTimeline(id);
        if (result.success) {
          router.refresh();
        } else {
          alert(`삭제 실패: ${result.message}`);
        }
      });
    }
  };

  return (
    <Container className='space-y-2'>
      <div className='flex flex-col items-end justify-between border-b pt-8 pb-4 sm:flex-row'>
        <AccentTitle
          text='Timeline'
          accentText='Management'
          description='타임라인을 추가, 수정, 삭제할 수 있습니다.'
        />

        <Button
          onClick={() => {
            setTimelineToEdit(null);
            setIsModalOpen(true);
          }}
          variant='inverted'
        >
          타임라인 추가
          <Plus />
        </Button>
      </div>

      <Button variant='plain' asChild>
        <Link href='/admin'>
          <ArrowLeft />
          대시보드로 돌아가기
        </Link>
      </Button>

      <div className='space-y-10'>
        {TIMELINE_TYPES.map((type) => {
          const filteredTimelines = timelines.filter((t) => t.type === type);

          return (
            <TimelineManagementList key={type} type={type}>
              {filteredTimelines.length === 0 ? (
                <div className='text-muted-foreground flex h-32 items-center justify-center rounded-xl border border-dashed'>
                  등록된 {type} 항목이 없습니다.
                </div>
              ) : (
                filteredTimelines.map((timeline) => (
                  <TimelineManagementCard
                    key={timeline.id}
                    timeline={timeline}
                    onUpdate={handleEdit}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </TimelineManagementList>
          );
        })}
      </div>
      <TimelineModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        timelineToEdit={timelineToEdit}
      />
    </Container>
  );
};

export default AdminTimelineClient;

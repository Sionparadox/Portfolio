import { Button } from '@/components/atoms/Button';
import GlassCard from '@/components/atoms/GlassCard';
import { TimelineItemType } from '@/types/timeline';
import { Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';

type TimelineManagementCardProps = {
  timeline: TimelineItemType;
  onUpdate: (timeline: TimelineItemType) => void;
  onDelete: (id: string, title: string) => void;
};

const TimelineManagementCard = ({
  timeline,
  onUpdate,
  onDelete,
}: TimelineManagementCardProps) => {
  return (
    <GlassCard className='flex items-center gap-4 p-5'>
      <Image
        src={timeline.image}
        alt={timeline.title}
        className='h-10 w-10 rounded-full object-cover'
        width={40}
        height={40}
      />
      <div className='flex flex-1 flex-col'>
        <h3 className='font-bold'>{timeline.title}</h3>
        <p className='text-muted-foreground text-sm'>{timeline.date}</p>
      </div>
      <div className='flex gap-2'>
        <Button
          size='icon'
          variant='outline'
          onClick={() => onUpdate(timeline)}
        >
          <Pencil />
        </Button>
        <Button
          size='icon'
          variant='destructive'
          onClick={() => onDelete(timeline.id, timeline.title)}
        >
          <Trash2 />
        </Button>
      </div>
    </GlassCard>
  );
};

export default TimelineManagementCard;

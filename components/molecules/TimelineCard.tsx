import { TimelineItemType } from '@/types/timeline';
import { Building2, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

type TimelineCardProps = {
  item: TimelineItemType;
  variant?: 'mobile' | 'desktop';
  className?: string;
};

const ICON_SIZE = 14;

const TimelineCard = ({
  item,
  variant = 'desktop',
  className,
}: TimelineCardProps) => {
  const isMobile = variant === 'mobile';

  return (
    <article
      className={cn(
        'bg-card text-card-foreground hover:border-primary hover:text-foreground rounded-lg border p-4 text-start shadow-lg transition-all duration-300',
        !isMobile && 'hover:scale-[1.02]',
        className
      )}
    >
      <h3
        className={cn(
          'text-foreground font-semibold',
          isMobile ? 'text-base' : 'text-lg'
        )}
      >
        {item.title}
      </h3>

      <div className='flex items-center gap-2'>
        <Calendar
          size={ICON_SIZE}
          className='text-foreground'
          aria-hidden='true'
        />
        <p className={isMobile ? 'text-sm' : 'text-xs'}>
          <span className='sr-only'>날짜: </span>
          {item.date}
        </p>
      </div>

      <div className='mb-1 flex items-center gap-2'>
        <Building2
          size={ICON_SIZE}
          className='text-foreground'
          aria-hidden='true'
        />
        <p className={isMobile ? 'text-sm' : 'text-xs'}>
          <span className='sr-only'>장소: </span>
          {item.place}
        </p>
      </div>

      <ul className='list-none space-y-1'>
        {item.descriptions.map((description, idx) => (
          <li
            className={cn('text-sm', !isMobile && 'leading-tight')}
            key={`${item.id}-desc-${idx}`}
          >
            {'•'} {description}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default TimelineCard;

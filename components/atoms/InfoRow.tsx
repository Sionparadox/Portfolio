import { IconType } from 'react-icons';
import { cn } from '@/lib/utils';

type InfoRowProps = {
  Icon: IconType;
  label: string;
  value: string;
  className?: string;
};

const InfoRow = ({ Icon, label, value, className }: InfoRowProps) => {
  return (
    <div className={cn('flex w-full items-center gap-2', className)}>
      <div className='bg-muted flex h-8 w-8 items-center justify-center rounded-sm'>
        <Icon className='size-5' />
      </div>
      <p className='text-muted-foreground w-20 text-start'>{label}</p>
      <p className=''>{value}</p>
    </div>
  );
};

export default InfoRow;

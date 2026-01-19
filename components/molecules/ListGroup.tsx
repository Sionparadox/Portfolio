import { cn } from '@/lib/utils';
import GlassCard from '../atoms/GlassCard';

type ListGroupProps = {
  children: React.ReactNode;
  className?: string;
};

const ListGroupWrapper = ({ children, className }: ListGroupProps) => {
  return (
    <div className='group/list relative'>
      <GlassCard
        className={cn('flex w-full flex-col gap-2 p-4 sm:gap-4', className)}
      >
        {children}
      </GlassCard>
    </div>
  );
};

const ListGroupTitle = ({ children, className }: ListGroupProps) => {
  return <h2 className={cn('text-xl font-semibold', className)}>{children}</h2>;
};

const ListGroupContent = ({ children, className }: ListGroupProps) => {
  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      {children}
    </div>
  );
};

const ListGroup = {
  Wrapper: ListGroupWrapper,
  Title: ListGroupTitle,
  Content: ListGroupContent,
};

export default ListGroup;

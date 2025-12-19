import { cn } from '@/lib/utils';

type ListGroupProps = {
  children: React.ReactNode;
  className?: string;
};

const ListGroupWrapper = ({ children, className }: ListGroupProps) => {
  return (
    <div className='group relative'>
      <div
        className={cn(
          'bg-background hover:border-primary flex w-full flex-col gap-2 rounded-2xl border p-4 transition-colors duration-300 group-hover:shadow-lg sm:gap-4',
          className
        )}
      >
        {children}
      </div>
      <div className='bg-primary absolute inset-0 top-2 -right-2 -bottom-2 left-2 -z-10 rounded-2xl opacity-90 transition-all duration-300 group-hover:top-0 group-hover:right-0 group-hover:bottom-0 group-hover:left-0' />
    </div>
  );
};

const ListGroupTitle = ({ children, className }: ListGroupProps) => {
  return <h2 className={cn('text-xl font-semibold', className)}>{children}</h2>;
};

const ListGroupContent = ({ children, className }: ListGroupProps) => {
  return <div className={cn('flex flex-col gap-2', className)}>{children}</div>;
};

const ListGroup = {
  Wrapper: ListGroupWrapper,
  Title: ListGroupTitle,
  Content: ListGroupContent,
};

export default ListGroup;

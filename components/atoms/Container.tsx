import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

type ContainerProps = VariantProps<typeof containerVariants> & {
  children: React.ReactNode;
  className?: string;
};

const containerVariants = cva('w-full', {
  variants: {
    xPadding: {
      default: 'px-2 sm:px-4 md:px-8 lg:px-12',
      tight: 'px-1 sm:px-2 md:px-4 lg:px-6',
      full: 'px-0',
      loose: 'px-4 sm:px-8 md:px-16 lg:px-24',
    },
  },
  defaultVariants: {
    xPadding: 'default',
  },
});
const Container = ({ children, className, xPadding }: ContainerProps) => {
  return (
    <div className={cn(containerVariants({ xPadding }), className)}>
      {children}
    </div>
  );
};

export default Container;

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

type ContainerProps = VariantProps<typeof containerVariants> & {
  children: React.ReactNode;
  className?: string;
};

const containerVariants = cva('w-full', {
  variants: {
    xPadding: {
      default: 'px-4 sm:px-6 md:px-12 lg:px-16',
      tight: 'px-2 sm:px-4 md:px-8 lg:px-12',
      full: 'px-0',
    },
    yPadding: {
      default: 'py-4 sm:py-5 lg:py-6',
      tight: 'py-2 sm:py-3 lg:py-4',
      full: 'py-0',
      loose: 'py-6 sm:py-8 lg:py-10',
    },
  },
  defaultVariants: {
    xPadding: 'default',
    yPadding: 'default',
  },
});
const Container = ({
  children,
  className,
  xPadding,
  yPadding,
}: ContainerProps) => {
  return (
    <div className={cn(containerVariants({ xPadding, yPadding }), className)}>
      {children}
    </div>
  );
};

export default Container;

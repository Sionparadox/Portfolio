import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

type ContainerProps = VariantProps<typeof containerVariants> & {
  children: React.ReactNode;
  className?: string;
};

const containerVariants = cva('mx-auto w-full', {
  variants: {
    xPadding: {
      default: 'px-4 sm:px-6 md:px-8 lg:px-12',
      full: 'px-0',
    },
    fullWidth: {
      true: 'max-w-none',
      false: 'max-w-[1440px]',
    },
  },
  defaultVariants: {
    xPadding: 'default',
    fullWidth: false,
  },
});
const Container = ({
  children,
  className,
  xPadding,
  fullWidth,
}: ContainerProps) => {
  return (
    <div className={cn(containerVariants({ xPadding, fullWidth }), className)}>
      {children}
    </div>
  );
};

export default Container;

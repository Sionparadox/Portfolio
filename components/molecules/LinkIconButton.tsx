import { type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '../atoms/Button';

type LinkIconButtonProps = {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
  download?: boolean;
  className?: string;
};

const LinkIconButton = ({
  href,
  icon: Icon,
  children,
  download = false,
  className,
}: LinkIconButtonProps) => {
  const Comp = download ? 'a' : Link;

  return (
    <Button
      variant='outline'
      asChild
      className={cn(
        'group hover:text-primary-foreground relative overflow-hidden',
        className
      )}
    >
      <Comp href={href} download={download}>
        {/* Gradient 배경 */}
        <span
          className='from-primary via-secondary to-primary absolute inset-0 bg-linear-to-r bg-size-[200%_100%] opacity-0 transition-opacity duration-300 group-hover:animate-[gradient-flow_3s_linear_infinite] group-hover:opacity-100'
          aria-hidden='true'
        />
        {/* 콘텐츠 */}
        <span className='relative flex items-center'>
          {children}
          <Icon className='ml-2 h-4 w-4' />
        </span>
      </Comp>
    </Button>
  );
};

export default LinkIconButton;

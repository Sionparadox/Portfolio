import { Button } from '@/components/atoms/Button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const NavLink = ({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) => {
  return (
    <Button
      variant='plain'
      size='default'
      className={cn(className, 'text-lg font-black')}
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

export default NavLink;

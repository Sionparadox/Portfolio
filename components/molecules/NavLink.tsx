import { Button } from '@/components/atoms/Button';
import Link from 'next/link';

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
    <Button variant='plain' size='default' className={className} asChild>
      <Link href={href}>{children}</Link>
    </Button>
  );
};

export default NavLink;

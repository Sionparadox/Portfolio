'use client';

import { Button } from '@/components/atoms/Button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLink = ({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Button variant='plain' size='default' className={className} asChild>
      <Link
        href={href}
        scroll={undefined}
        className={isActive ? 'text-primary' : ''}
      >
        {children}
      </Link>
    </Button>
  );
};

export default NavLink;

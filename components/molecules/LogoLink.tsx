import Link from 'next/link';
import Logo from '../atoms/Logo';

const LogoLink = () => {
  return (
    <Link href='/' aria-label='Home' scroll={undefined}>
      <Logo />
    </Link>
  );
};

export default LogoLink;

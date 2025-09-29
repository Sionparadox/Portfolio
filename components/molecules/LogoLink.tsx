import Link from 'next/link';
import Logo from '../atoms/Logo';

const LogoLink = () => {
  return (
    <Link href='/' aria-label='Home'>
      <Logo />
    </Link>
  );
};

export default LogoLink;

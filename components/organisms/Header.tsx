'use client';

import Container from '../atoms/Container';
import LogoLink from '../molecules/LogoLink';
import MobileNavMenu from '../molecules/MobileNavMenu';
import NavMenu from '../molecules/NavMenu';

const Header = () => {
  return (
    <header className='fixed top-0 right-0 left-0 z-30 h-16 w-full bg-transparent py-2 backdrop-blur-xs sm:h-24 sm:py-3 lg:py-4'>
      <Container className='flex items-center justify-between'>
        <LogoLink />
        <div className='hidden sm:flex'>
          <NavMenu />
        </div>
        <div className='flex sm:hidden'>
          <MobileNavMenu />
        </div>
      </Container>
    </header>
  );
};

export default Header;

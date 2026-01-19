'use client';

import Container from '../atoms/Container';
import LogoLink from '../molecules/LogoLink';
import MobileNavMenu from '../molecules/MobileNavMenu';
import NavMenu from '../molecules/NavMenu';

const Header = () => {
  return (
    <header className='border-glass-border shadow-glass-shadow fixed top-0 right-0 left-0 z-30 flex h-16 w-full items-center justify-center border-b bg-transparent py-2 shadow-xs backdrop-blur-xs sm:h-24'>
      <Container fullWidth className='flex items-center justify-between'>
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

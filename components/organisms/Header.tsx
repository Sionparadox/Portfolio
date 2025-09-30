'use client';

import LogoLink from '../molecules/LogoLink';
import MobileNavMenu from '../molecules/MobileNavMenu';
import NavMenu from '../molecules/NavMenu';

const Header = () => {
  return (
    <header className='fixed top-0 right-0 left-0 z-30 flex h-24 w-full items-center justify-between bg-transparent px-4'>
      <LogoLink />
      <div className='hidden sm:flex'>
        <NavMenu />
      </div>
      <div className='flex sm:hidden'>
        <MobileNavMenu />
      </div>
    </header>
  );
};

export default Header;

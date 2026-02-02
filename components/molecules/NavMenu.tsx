import { navItems } from '@/constants/navItems';
import NavLink from './NavLink';
import ThemeToggleButton from './ThemeToggleButton';

const NavMenu = () => {
  return (
    <div className='flex items-center gap-4 text-xl'>
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          href={item.href}
          className='text-lg font-black'
        >
          {item.name}
        </NavLink>
      ))}
      <ThemeToggleButton className='text-2xl' />
    </div>
  );
};

export default NavMenu;

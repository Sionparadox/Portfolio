import { navItems } from '../../constants/navItems';
import NavLink from './NavLink';
import ThemeToggleButton from './ThemeToggleButton';

const NavMenu = () => {
  return (
    <div className='flex gap-4'>
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          href={item.href}
          className='text-lg font-black'
        >
          {item.name}
        </NavLink>
      ))}
      <ThemeToggleButton />
    </div>
  );
};

export default NavMenu;

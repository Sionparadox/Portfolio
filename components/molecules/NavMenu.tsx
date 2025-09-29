import { navItems } from '../../constants/navItems';
import NavLink from './NavLink';

const NavMenu = () => {
  return (
    <div className='flex gap-4'>
      {navItems.map((item) => (
        <NavLink key={item.name} href={item.href}>
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

export default NavMenu;

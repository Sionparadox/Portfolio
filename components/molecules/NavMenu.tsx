import { LucideSun } from 'lucide-react';
import { navItems } from '../../constants/navItems';
import { Button } from '../atoms/Button';
import NavLink from './NavLink';

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
      {/* TODO: 다크모드 버튼 */}
      <Button variant='ghost' size='icon'>
        <LucideSun />
      </Button>
    </div>
  );
};

export default NavMenu;

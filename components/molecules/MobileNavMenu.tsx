import { LucideMenu } from 'lucide-react';
import { navItems } from '../../constants/navItems';
import DropdownMenu from './DropdownMenu';
import NavLink from './NavLink';

const MobileNavMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <LucideMenu />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {navItems.map((item) => (
          <DropdownMenu.Item key={item.name}>
            <NavLink href={item.href}>{item.name}</NavLink>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};

export default MobileNavMenu;

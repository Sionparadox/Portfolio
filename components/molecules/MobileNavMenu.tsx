import { LucideMenu } from 'lucide-react';
import { FaFilePdf, FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import { navItems } from '../../constants/navItems';
import { Button } from '../atoms/Button';
import DropdownMenu from './DropdownMenu';
import NavLink from './NavLink';
import ThemeToggleButton from './ThemeToggleButton';

const MobileNavMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <LucideMenu />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className='fixed right-0 left-0 w-auto'>
        {navItems.map((item) => (
          <DropdownMenu.Item key={item.name} asChild>
            <NavLink href={item.href}>{item.name}</NavLink>
          </DropdownMenu.Item>
        ))}
        <DropdownMenu.Footer className='flex items-center justify-center'>
          <ThemeToggleButton />
          <Button variant='ghost' size='icon' asChild>
            <Link href='https://github.com/Sionparadox' target='_blank'>
              <FaGithub />
            </Link>
          </Button>
          <Button variant='ghost' size='icon' asChild>
            <a href='/pdf/resume.pdf' download>
              <FaFilePdf />
            </a>
          </Button>
        </DropdownMenu.Footer>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};

export default MobileNavMenu;

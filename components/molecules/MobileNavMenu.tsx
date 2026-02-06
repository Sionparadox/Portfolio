import { FaFilePdf, FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import { navItems } from '../../constants/navItems';
import { Button } from '../atoms/Button';
import NavLink from './NavLink';
import Sidebar from './Sidebar';
import ThemeToggleButton from './ThemeToggleButton';

const MobileNavMenu = () => {
  return (
    <Sidebar>
      <Sidebar.Trigger />
      <Sidebar.Content>
        <Sidebar.Nav className='pt-20'>
          <Sidebar.Item asChild>
            <NavLink href='/'>Home</NavLink>
          </Sidebar.Item>
          {navItems.map((item) => (
            <Sidebar.Item key={item.name} asChild>
              <NavLink href={item.href}>{item.name}</NavLink>
            </Sidebar.Item>
          ))}
        </Sidebar.Nav>

        <Sidebar.Footer>
          <div className='flex flex-col items-center gap-4'>
            <ThemeToggleButton className='text-2xl' />
            <div className='flex items-center justify-center gap-2'>
              <Button variant='ghost' size='icon' asChild>
                <Link href='https://github.com/Sionparadox' target='_blank'>
                  <FaGithub className='h-5 w-5' />
                </Link>
              </Button>
              <Button variant='ghost' size='icon' asChild>
                <a href='/pdf/resume.pdf' download>
                  <FaFilePdf className='h-5 w-5' />
                </a>
              </Button>
            </div>
          </div>
        </Sidebar.Footer>
      </Sidebar.Content>
    </Sidebar>
  );
};

export default MobileNavMenu;

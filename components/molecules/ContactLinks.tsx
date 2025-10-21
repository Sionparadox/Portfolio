import { FaFilePdf, FaGithub } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '../atoms/Button';

const ContactLinks = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex gap-2', className)}>
      <Link href='https://github.com/Sionparadox' target='_blank'>
        <Button size='icon' variant='outline'>
          <FaGithub />
        </Button>
      </Link>
      <Button size='icon' variant='outline'>
        <MdMail />
      </Button>
      <Button size='icon' variant='outline'>
        <FaFilePdf />
      </Button>
    </div>
  );
};

export default ContactLinks;

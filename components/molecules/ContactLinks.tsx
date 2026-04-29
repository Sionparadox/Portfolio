import { FaFilePdf, FaGithub } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '../atoms/Button';

const ContactLinks = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex gap-2', className)}>
      <Link
        href='https://github.com/Sionparadox'
        target='_blank'
        scroll={undefined}
        aria-label='깃허브 이동하기'
      >
        <Button size='icon' variant='outline' asChild>
          <span>
            <FaGithub />
          </span>
        </Button>
      </Link>
      <Link href='mailto:sions.dev@gmail.com' aria-label='이메일 보내기'>
        <Button size='icon' variant='outline' asChild>
          <span>
            <MdMail />
          </span>
        </Button>
      </Link>
      <a
        href='/sion_portfolio.pdf'
        target='_blank'
        download
        aria-label='이력서 PDF 다운로드하기'
      >
        <Button size='icon' variant='outline' asChild>
          <span>
            <FaFilePdf />
          </span>
        </Button>
      </a>
    </div>
  );
};

export default ContactLinks;

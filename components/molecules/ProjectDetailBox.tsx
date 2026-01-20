import { Calendar, Clock, CodeXml, ExternalLink, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Badge from '../atoms/Badge';
import { Button } from '../atoms/Button';
import InfoRow from '../atoms/InfoRow';

//TODO: hover 효과 및 Data 연동
const ProjectDetailBox = () => {
  return (
    <div className='bg-card relative z-0 w-80 overflow-hidden rounded-2xl'>
      <div className='absolute -inset-[150%] -z-20 animate-[spin_4s_linear_infinite] bg-conic from-cyan-500 via-purple-500 to-cyan-500' />

      <div className='bg-card absolute inset-1 -z-10 rounded-2xl' />
      <div className='relative z-10 flex flex-col items-center gap-4 p-4 py-5'>
        <div className='relative flex items-center justify-center'>
          <Image
            src='/img/timeline/hana.png'
            alt='Inu'
            width={80}
            height={80}
          />
          <div className='absolute -inset-2 -z-10 rounded-full bg-conic from-cyan-300 via-purple-300 to-cyan-300 blur dark:from-cyan-500 dark:via-purple-500 dark:to-cyan-500' />
        </div>
        <h3 className='text-lg font-bold'>Portfolio</h3>
        <div className='w-full border-b' />
        <div className='flex w-full flex-col gap-3'>
          <InfoRow Icon={Calendar} label='시작' value='2025.12.09' />
          <InfoRow Icon={Calendar} label='종료' value='2026.01.29' />
          <InfoRow Icon={Clock} label='기간' value='2개월' />
          <InfoRow Icon={Users} label='인원' value='1명' />
        </div>
        <div className='w-full border-b' />
        <div className='flex w-full flex-wrap items-center justify-center gap-2'>
          <Badge label='React' />
          <Badge label='Next.js' />
          <Badge label='Tailwind CSS' />
          <Badge label='Prisma' />
          <Badge label='NeonDB' />
          <Badge label='Vercel' />
        </div>
        <div className='w-full border-b' />
        <div className='flex w-full gap-3'>
          <Button variant='inverted' className='w-full' asChild>
            <Link href='/' target='_blank'>
              Live
              <ExternalLink />
            </Link>
          </Button>
          <Button variant='inverted' className='w-full' asChild>
            <Link
              href='https://github.com/Sionparadox/portfolio'
              target='_blank'
            >
              <CodeXml />
              Source
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailBox;

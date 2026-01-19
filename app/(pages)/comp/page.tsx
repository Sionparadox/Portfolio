import Badge from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import ExploreCard from '@/components/molecules/ExploreCard';
import ProjectCard from '@/components/molecules/ProjectCard';
import { Calendar, Clock, CodeXml, ExternalLink, Users } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import Image from 'next/image';

const Page = () => {
  return (
    <Container className='flex flex-col items-center justify-center gap-12 text-center'>
      <div className='flex w-full justify-center gap-4 py-8 text-left'>
        <ExploreCard
          title='Explore Card'
          description='Explore Card is a card component that is styled to look like a glass.'
          icon={FaGithub}
          link='https://github.com'
        />
      </div>

      <div className='grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>

      <div className='bg-card relative z-0 w-80 overflow-hidden rounded-2xl'>
        <div className='absolute -inset-[150%] -z-20 animate-[spin_4s_linear_infinite] bg-conic from-cyan-500 via-purple-500 to-cyan-500' />

        <div className='bg-card absolute inset-1 -z-10 rounded-2xl' />
        <div className='relative z-10 flex flex-col items-center gap-4 p-4 py-5'>
          <div className='relative flex items-center justify-center'>
            <Image
              src='/img/timeline/inu.svg'
              alt='Inu'
              width={80}
              height={80}
            />
            <div className='absolute -inset-1 -z-10 rounded-full bg-conic from-cyan-300 via-purple-300 to-cyan-300 blur dark:from-cyan-500 dark:via-purple-500 dark:to-cyan-500' />
          </div>
          <h3 className='text-lg font-bold'>Portfolio</h3>
          <div className='w-full border-b' />
          <div className='flex w-full flex-col gap-3'>
            <div className='flex w-full items-center gap-2'>
              <div className='bg-muted flex h-8 w-8 items-center justify-center rounded-sm'>
                <Calendar className='size-5' />
              </div>
              <p className='text-muted-foreground w-20 text-start'>시작</p>
              <p className=''>2025.12.09</p>
            </div>
            <div className='flex w-full items-center gap-2'>
              <div className='bg-muted flex h-8 w-8 items-center justify-center rounded-sm'>
                <Calendar className='size-5' />
              </div>
              <p className='text-muted-foreground w-20 text-start'>종료</p>
              <p className=''>2026.01.29</p>
            </div>

            <div className='flex w-full items-center gap-2'>
              <div className='bg-muted flex h-8 w-8 items-center justify-center rounded-sm'>
                <Clock className='size-5' />
              </div>
              <p className='text-muted-foreground w-20 text-start'>기간</p>
              <p className=''>2개월</p>
            </div>
            <div className='flex w-full items-center gap-2'>
              <div className='bg-muted flex h-8 w-8 items-center justify-center rounded-sm'>
                <Users className='size-5' />
              </div>
              <p className='text-muted-foreground w-20 text-start'>인원</p>
              <p className=''>7명</p>
            </div>
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
            <Button variant='inverted' className='w-full'>
              Live
              <ExternalLink />
            </Button>
            <Button variant='inverted' className='w-full'>
              Source
              <CodeXml />
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Page;

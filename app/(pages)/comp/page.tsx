'use client';

import Container from '@/components/atoms/Container';
import GlassCard from '@/components/atoms/GlassCard';
import AccentTitle from '@/components/molecules/AccentTitle';
import ExploreCard from '@/components/molecules/ExploreCard';
import ExperienceSection from '@/components/templates/ExperienceSection';
import SkillSection from '@/components/templates/SkillSection';
import { FaGithub } from 'react-icons/fa6';
import Image from 'next/image';

const Page = () => {
  return (
    <Container className='flex flex-col items-center justify-center gap-8 text-center'>
      <div className='group/spi relative h-112 w-84'>
        <div className='relative z-10 h-full w-full overflow-hidden rounded-2xl bg-white transition-all duration-300 group-hover/spi:border-2'>
          <Image
            src='/img/SquareImg.png'
            alt='My Profile Image'
            className='transition-all duration-300 group-hover/spi:scale-105'
            fill
          />
        </div>
        <div className='gradient-neon-bg absolute inset-0 -top-2 -right-2 -bottom-2 -left-2 rounded-2xl transition-all duration-300 group-hover/spi:rotate-180' />
        <div className='absolute inset-0 -z-10 scale-105 bg-linear-to-br from-cyan-500 to-purple-500 blur-lg transition-all duration-300 group-hover/spi:blur-xl' />
      </div>
      <div className='flex w-full justify-center gap-4 py-8 text-left'>
        <ExploreCard
          title='Explore Card'
          description='Explore Card is a card component that is styled to look like a glass.'
          icon={FaGithub}
          link='https://github.com'
        />
      </div>
      {/**Image PieChart */}
      <div className='group relative h-32 w-32 overflow-hidden rounded-full bg-white shadow-lg'>
        <Image
          src='/img/timeline/inu.svg'
          alt='Inu'
          fill
          className='z-1 object-contain group-hover:grayscale-75'
        />
        <div className='absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:bg-white/30 group-hover:opacity-100 group-hover:backdrop-blur-sm'>
          <div className='bg-linear-to-r from-cyan-500 via-purple-500 to-cyan-500 bg-clip-text text-xl font-bold text-transparent'>
            typeScript
          </div>
        </div>
      </div>
      <GlassCard className='group h-40 w-40'>
        <div className='flex h-full w-full flex-col items-center justify-center gap-2'>
          <div className='relative h-24 w-24 rounded-full'>
            <Image
              src='/img/timeline/inu.svg'
              alt='Inu'
              fill
              className='z-1 object-contain transition-colors duration-300 group-hover:grayscale-75'
            />
            <div className='absolute inset-0 z-2 rounded-full transition-colors duration-300 group-hover:bg-white/30 group-hover:backdrop-blur-sm'></div>
          </div>
          <div className='text-lg font-bold transition-colors duration-300 group-hover:bg-linear-to-r group-hover:from-cyan-500 group-hover:to-purple-500 group-hover:bg-clip-text group-hover:text-transparent'>
            typescript
          </div>
        </div>
      </GlassCard>
      <div className='w-full'>
        <AccentTitle
          as='h2'
          text='How I'
          accentText='Grew'
          text2='Up'
          color='neon'
        />
      </div>
      <ExperienceSection />

      <AccentTitle
        as='h2'
        text='What I'
        accentText='Build'
        text2='with'
        color='neon'
      />

      <SkillSection />
    </Container>
  );
};

export default Page;

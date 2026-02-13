import Container from '@/components/atoms/Container';
import AccentTitle from '@/components/molecules/AccentTitle';
import AboutSection from '@/components/templates/AboutSection';
import ExperienceSection from '@/components/templates/ExperienceSection';
import QuoteSection from '@/components/templates/QuoteSection';
import SkillSection from '@/components/templates/SkillSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    '프론트엔드 개발자 박시온의 소개, 경험, 기술 스택을 확인해보세요.',
};
export const dynamic = 'force-dynamic';
const AboutPage = () => {
  return (
    <Container className='mb-4 flex flex-col items-center justify-center gap-8 text-center'>
      <AccentTitle text='About' accentText='Me' className='sm:pt-6' />
      <div className='flex w-full flex-col gap-20'>
        <AboutSection />
        <QuoteSection />
        <ExperienceSection />
        <SkillSection />
      </div>
    </Container>
  );
};

export default AboutPage;

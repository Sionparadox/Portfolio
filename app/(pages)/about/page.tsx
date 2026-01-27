import Container from '@/components/atoms/Container';
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

const AboutPage = () => {
  return (
    <Container className='flex flex-col items-center justify-center gap-16 text-center'>
      <AboutSection />
      <QuoteSection />
      <ExperienceSection />
      <SkillSection />
    </Container>
  );
};

export default AboutPage;

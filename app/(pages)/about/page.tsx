import Container from '@/components/atoms/Container';
import AboutSection from '@/components/templates/AboutSection';
import ExperienceSection from '@/components/templates/ExperienceSection';
import QuoteSection from '@/components/templates/QuoteSection';
import SkillSection from '@/components/templates/SkillSection';

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

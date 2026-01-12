import Container from '@/components/atoms/Container';
import AccentTitle from '@/components/molecules/AccentTitle';
import AboutSection from '@/components/templates/AboutSection';
import ExperienceSection from '@/components/templates/ExperienceSection';
import QuoteSection from '@/components/templates/QuoteSection';
import SkillSection from '@/components/templates/SkillSection';

const AboutPage = () => {
  return (
    <Container className='flex flex-col items-center justify-center gap-8 text-center'>
      <AccentTitle text='About' accentText='Me' className='sm:pt-6' />
      <AboutSection />
      <QuoteSection />
      <ExperienceSection />
      <SkillSection />
    </Container>
  );
};

export default AboutPage;

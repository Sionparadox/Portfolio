import Container from '@/components/atoms/Container';
import AccentTitle from '@/components/molecules/AccentTitle';
import AboutSection from '@/components/templates/AboutSection';
import QuoteSection from '@/components/templates/QuoteSection';

const AboutPage = () => {
  return (
    <Container className='flex flex-col items-center justify-center gap-8 text-center'>
      <AccentTitle text='About' accentText='Me' className='sm:pt-6' />
      <AboutSection />
      <QuoteSection />
    </Container>
  );
};

export default AboutPage;

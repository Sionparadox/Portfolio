import Container from '@/components/atoms/Container';
import AccentTitle from '@/components/molecules/AccentTitle';

const AboutPage = () => {
  return (
    <Container className='flex flex-col items-center justify-center gap-8 text-center'>
      <AccentTitle text='About' accentText='Me' className='sm:pt-8' />
    </Container>
  );
};

export default AboutPage;

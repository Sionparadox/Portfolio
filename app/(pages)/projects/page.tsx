import Container from '@/components/atoms/Container';
import AccentTitle from '@/components/molecules/AccentTitle';
import GlassCard from '../../../components/atoms/GlassCard';

const ProjectsPage = () => {
  return (
    <Container className='flex flex-col items-center justify-center gap-8 text-center'>
      <AccentTitle text='Featured' accentText='Projects' className='sm:pt-8' />
    </Container>
  );
};

export default ProjectsPage;

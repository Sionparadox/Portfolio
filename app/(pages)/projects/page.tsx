import { getProjects } from '@/actions/project';
import Container from '@/components/atoms/Container';
import AccentTitle from '@/components/molecules/AccentTitle';
import ProjectsClientWrapper from '@/components/organisms/ProjectsClientWrapper';

const ProjectsPage = async () => {
  const result = await getProjects();
  const projects = result.success && result.data ? result.data : [];

  return (
    <Container className='flex flex-col items-center justify-center gap-8 text-center'>
      <AccentTitle text='Featured' accentText='Projects' className='sm:pt-8' />
      <ProjectsClientWrapper initialProjects={projects} />
    </Container>
  );
};

export default ProjectsPage;

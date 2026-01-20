import Container from '@/components/atoms/Container';
import ExploreCard from '@/components/molecules/ExploreCard';
import ProjectCard from '@/components/molecules/ProjectCard';
import ProjectDetailBox from '@/components/molecules/ProjectDetailBox';
import { FaGithub } from 'react-icons/fa6';

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
      <ProjectDetailBox />
    </Container>
  );
};

export default Page;

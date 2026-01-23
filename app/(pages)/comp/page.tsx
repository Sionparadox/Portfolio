import Container from '@/components/atoms/Container';
import ExploreCard from '@/components/molecules/ExploreCard';
import ProjectListCard from '@/components/molecules/ProjectListCard';
import { ProjectItemType } from '@/types/project';
import { FaGithub } from 'react-icons/fa6';

const tempProject: ProjectItemType = {
  id: '1',
  slug: 'project-1',
  title: 'Project 1',
  overview:
    'Project 1 overview Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
  description: 'Project 1 description',
  icon: '/img/projects/one-hada/icon.png',
  contributions: ['Contribution 1', 'Contribution 2', 'Contribution 3'],
  insights: ['Insight 1', 'Insight 2', 'Insight 3'],
  teamSize: 3,
  thumbnail: '/img/projects/one-hada/thumbnail.png',
  techStack: ['React', 'Next.js', 'TypeScript'],
  category: 'Web',
  startDate: new Date(),
  endDate: new Date(),
  featured: false,
  order: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};
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
      <div className='flex w-full flex-col gap-2'>
        <ProjectListCard project={tempProject} />
        <ProjectListCard project={tempProject} />
        <ProjectListCard project={tempProject} />
      </div>
    </Container>
  );
};

export default Page;

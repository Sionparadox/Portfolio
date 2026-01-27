import { getAdjacentProjects, getProject } from '@/actions/project';
import Container from '@/components/atoms/Container';
import ProjectDetailContent from '@/components/organisms/ProjectDetailContent';
import ProjectDetailHeader from '@/components/organisms/ProjectDetailHeader';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await getProject(slug);

  if (!result.success || !result.data) {
    return {
      title: '프로젝트를 찾을 수 없습니다',
      description: '요청하신 프로젝트를 찾을 수 없습니다.',
    };
  }

  const project = result.data;

  return {
    title: `${project.title}`,
    description: project.overview,
    openGraph: {
      images: project.thumbnail ? [project.thumbnail] : undefined,
    },
  };
}
const ProjectDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const result = await getProject(slug);

  if (!result.success || !result.data) {
    notFound();
  }

  const project = result.data;
  const adjacentResult = await getAdjacentProjects(project.order);
  const prevProject =
    adjacentResult.success && adjacentResult.data?.prev
      ? adjacentResult.data.prev
      : null;
  const nextProject =
    adjacentResult.success && adjacentResult.data?.next
      ? adjacentResult.data.next
      : null;

  return (
    <>
      <ProjectDetailHeader project={project} />
      <Container className='pt-4'>
        <ProjectDetailContent
          project={project}
          prevProject={prevProject}
          nextProject={nextProject}
        />
      </Container>
    </>
  );
};

export default ProjectDetailPage;

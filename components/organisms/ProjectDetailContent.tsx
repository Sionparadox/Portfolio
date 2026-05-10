import { ProjectItemType } from '@/types/project';
import ProjectArticle from '../molecules/ProjectArticle';
import ProjectDetailBox from '../molecules/ProjectDetailBox';
import ProjectNavigationCard from '../molecules/ProjectNavigationCard';

interface ProjectDetailContentProps {
  project: ProjectItemType;
  prevProject: ProjectItemType | null;
  nextProject: ProjectItemType | null;
}

const ProjectDetailContent = ({
  project,
  prevProject,
  nextProject,
}: ProjectDetailContentProps) => {
  return (
    <>
      <div className='flex flex-col gap-6 sm:flex-row md:gap-12'>
        <ProjectDetailBox
          className='h-fit w-full shrink-0 sm:sticky sm:top-28 sm:order-2 sm:w-80'
          project={project}
        />
        <div className='flex w-full flex-col gap-8 sm:gap-10 md:gap-12'>
          <ProjectArticle
            title='Project Overview'
            description={project.description}
            sectionLabel='프로젝트 개요'
          />
          <ProjectArticle
            title='What I Did'
            description={
              <ul>
                {project.contributions.map((item, index) => (
                  <li key={`${item}-${index}`}>{item}</li>
                ))}
              </ul>
            }
            sectionLabel='주요 기여'
          />
          <ProjectArticle
            title='What I Learned'
            description={
              <ul>
                {project.insights.map((item, index) => (
                  <li key={`${item}-${index}`}>{item}</li>
                ))}
              </ul>
            }
            sectionLabel='배운 점'
          />
        </div>
      </div>
      <div className='mt-16 flex w-full justify-between gap-2 sm:gap-20'>
        {prevProject ? (
          <ProjectNavigationCard
            direction='prev'
            title={prevProject.title}
            slug={prevProject.slug}
            imageSrc={prevProject.icon}
          />
        ) : (
          <div className='w-full'></div>
        )}

        {nextProject ? (
          <ProjectNavigationCard
            direction='next'
            title={nextProject.title}
            slug={nextProject.slug}
            imageSrc={nextProject.icon}
          />
        ) : (
          <div className='w-full'></div>
        )}
      </div>
    </>
  );
};

export default ProjectDetailContent;

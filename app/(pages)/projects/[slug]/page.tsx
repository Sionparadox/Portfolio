'use client';

import { getAdjacentProjects, getProject } from '@/actions/project';
import Container from '@/components/atoms/Container';
import ProjectArticle from '@/components/molecules/ProjectArticle';
import ProjectDetailBox from '@/components/molecules/ProjectDetailBox';
import ProjectNavigationCard from '@/components/molecules/ProjectNavigationCard';
import { ProjectItemType } from '@/types/project';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ProjectDetailPage = ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const [project, setProject] = useState<ProjectItemType | null>(null);
  const [prevProject, setPrevProject] = useState<ProjectItemType | null>(null);
  const [nextProject, setNextProject] = useState<ProjectItemType | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      const { slug } = await params;
      const result = await getProject(slug);

      if (result.success && result.data) {
        setProject(result.data);
        const adjacentResult = await getAdjacentProjects(result.data.order);
        if (adjacentResult.success && adjacentResult.data) {
          setPrevProject(adjacentResult.data.prev ?? null);
          setNextProject(adjacentResult.data.next ?? null);
        }
      }
    };
    fetchProject();
  }, [params]);
  if (!project) {
    return <div>로딩중입니다...</div>;
  }
  return (
    <>
      {/* 프로젝트 설명 헤더 */}
      <div className='vertical-fade flex h-100 w-screen items-center justify-center overflow-hidden'>
        <Image
          src={project.thumbnail}
          alt='Project Thumbnail'
          fill
          className='-z-10 object-cover blur-xs'
          priority
        />

        <Container className='relative z-10 text-center'>
          <h1 className='mb-2 text-3xl font-bold sm:mb-4 sm:text-5xl'>
            {project.title}
          </h1>
          <p className='line-clamp-6 leading-relaxed font-medium'>
            {project.overview}
          </p>
        </Container>
      </div>

      <Container className='pt-4'>
        <div className='flex flex-col gap-6 sm:flex-row md:gap-12'>
          <ProjectDetailBox
            className='h-fit w-full shrink-0 sm:sticky sm:top-28 sm:order-2 sm:w-80'
            project={project}
          />
          <div className='flex w-full flex-col gap-12'>
            <ProjectArticle
              title='Project Overview'
              description={project.description}
            />
            <ProjectArticle
              title='What I Did'
              description={project.contributions.join(', ')}
            />
            <ProjectArticle
              title='What I Learned'
              description={project.insights.join(', ')}
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
      </Container>
    </>
  );
};

export default ProjectDetailPage;

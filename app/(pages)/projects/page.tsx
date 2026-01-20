'use client';

import { getProjects } from '@/actions/project';
import Container from '@/components/atoms/Container';
import AccentTitle from '@/components/molecules/AccentTitle';
import ProjectCard from '@/components/molecules/ProjectCard';
import { ProjectItemType } from '@/types/project';
import { useEffect, useState } from 'react';

//TODO: 필터링 기능
const ProjectsPage = () => {
  const [projects, setProjects] = useState<ProjectItemType[]>([]);
  useEffect(() => {
    const fetchProjects = async () => {
      const result = await getProjects();
      if (result.success && result.data) {
        setProjects(result.data);
      }
    };
    fetchProjects();
  }, []);
  return (
    <Container className='flex flex-col items-center justify-center gap-8 text-center'>
      <AccentTitle text='Featured' accentText='Projects' className='sm:pt-8' />
      <div className='grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Container>
  );
};

export default ProjectsPage;

'use client';

import { getProjects } from '@/actions/project';
import Container from '@/components/atoms/Container';
import AccentTitle from '@/components/molecules/AccentTitle';
import ProjectCard from '@/components/molecules/ProjectCard';
import ProjectToolbar from '@/components/molecules/ProjectToolbar';
import { ProjectItemType } from '@/types/project';
import { useEffect, useState } from 'react';

const ProjectsPage = () => {
  const [projects, setProjects] = useState<ProjectItemType[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectItemType[]>(
    []
  );
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

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

      <ProjectToolbar
        projects={projects}
        setFilteredProjects={setFilteredProjects}
        viewType={viewType}
        setViewType={setViewType}
      />

      <div
        className={`w-full ${
          viewType === 'grid'
            ? 'grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'
            : 'flex flex-col gap-6'
        }`}
      >
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className='w-full py-12 text-gray-500 dark:text-gray-400'>
          검색 결과가 없습니다.
        </div>
      )}
    </Container>
  );
};

export default ProjectsPage;

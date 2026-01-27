'use client';

import { ProjectItemType } from '@/types/project';
import { useState } from 'react';
import ProjectGridCard from '../molecules/ProjectGridCard';
import ProjectListCard from '../molecules/ProjectListCard';
import ProjectToolbar from '../molecules/ProjectToolbar';

interface ProjectsClientWrapperProps {
  initialProjects: ProjectItemType[];
}

const ProjectsClientWrapper = ({
  initialProjects,
}: ProjectsClientWrapperProps) => {
  const [filteredProjects, setFilteredProjects] =
    useState<ProjectItemType[]>(initialProjects);
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

  return (
    <>
      <ProjectToolbar
        projects={initialProjects}
        setFilteredProjects={setFilteredProjects}
        viewType={viewType}
        setViewType={setViewType}
      />

      <div
        className={`w-full ${
          viewType === 'grid'
            ? 'grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'
            : 'flex flex-col gap-2'
        }`}
      >
        {filteredProjects.map((project) =>
          viewType === 'grid' ? (
            <ProjectGridCard key={project.id} project={project} />
          ) : (
            <ProjectListCard key={project.id} project={project} />
          )
        )}
      </div>

      {filteredProjects.length === 0 && (
        <div className='w-full py-12 text-gray-500 dark:text-gray-400'>
          검색 결과가 없습니다.
        </div>
      )}
    </>
  );
};

export default ProjectsClientWrapper;

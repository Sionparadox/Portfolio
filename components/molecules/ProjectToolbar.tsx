'use client';

import useDebounce from '@/hooks/useDebounce';
import { ProjectItemType } from '@/types/project';
import { useCallback, useEffect, useMemo, useState } from 'react';
import SearchInput from '../atoms/SearchInput';
import Selector from '../atoms/Selector';
import ViewTypeToggle from '../atoms/ViewTypeToggle';
import CategoryFilter from './CategoryFilter';
import TechStackFilter from './TechStackFilter';

interface ProjectToolbarProps {
  projects: ProjectItemType[];
  setFilteredProjects: (projects: ProjectItemType[]) => void;
  viewType: 'grid' | 'list';
  setViewType: (type: 'grid' | 'list') => void;
}

const SORT_OPTIONS = [
  { value: 'default', label: '기본순' },
  { value: 'newest', label: '최신순' },
  { value: 'oldest', label: '오래된순' },
  { value: 'atoz', label: '이름순' },
];

const ProjectToolbar = ({
  projects,
  setFilteredProjects,
  viewType,
  setViewType,
}: ProjectToolbarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState('default');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTechStacks, setSelectedTechStacks] = useState<string[]>([]);

  // 검색어 디바운스 (300ms)
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(projects.map((p) => p.category))
    );
    return ['all', ...uniqueCategories];
  }, [projects]);

  const allTechStacks = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((project) => {
      project.techStack.forEach((tech) => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [projects]);

  const toggleTechStack = useCallback((tech: string) => {
    setSelectedTechStacks((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  }, []);

  const clearAllTechStacks = useCallback(() => {
    setSelectedTechStacks([]);
  }, []);

  const filteredProjects = useMemo(() => {
    let result = projects;

    if (debouncedSearchQuery) {
      const lowerQuery = debouncedSearchQuery.toLowerCase();
      result = result.filter((project) =>
        project.title.toLowerCase().includes(lowerQuery)
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter(
        (project) => project.category === selectedCategory
      );
    }

    if (selectedTechStacks.length > 0) {
      result = result.filter((project) =>
        selectedTechStacks.every((tech) => project.techStack.includes(tech))
      );
    }

    const sorted = [...result];
    switch (sortType) {
      case 'newest':
        sorted.sort(
          (a, b) =>
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
        break;
      case 'oldest':
        sorted.sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
        break;
      case 'atoz':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return sorted;
  }, [
    projects,
    debouncedSearchQuery,
    sortType,
    selectedCategory,
    selectedTechStacks,
  ]);

  useEffect(() => {
    setFilteredProjects(filteredProjects);
  }, [filteredProjects, setFilteredProjects]);

  return (
    <div className='flex w-full flex-col gap-4'>
      <div className='bg-card flex flex-col gap-3 rounded-lg border p-4'>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <TechStackFilter
          allTechStacks={allTechStacks}
          selectedTechStacks={selectedTechStacks}
          onToggleTechStack={toggleTechStack}
          onClearAll={clearAllTechStacks}
        />
      </div>

      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder='프로젝트 검색...'
          className='sm:max-w-md sm:flex-1'
        />

        <div className='flex flex-wrap items-center justify-between gap-3 sm:justify-end'>
          <ViewTypeToggle viewType={viewType} setViewType={setViewType} />
          <Selector
            value={sortType}
            options={SORT_OPTIONS}
            onChange={setSortType}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectToolbar;

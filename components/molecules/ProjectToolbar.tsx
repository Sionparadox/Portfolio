'use client';

import { ProjectItemType } from '@/types/project';
import { useEffect, useMemo, useState } from 'react';
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

  const sortOptions = [
    { value: 'default', label: '기본순' },
    { value: 'newest', label: '최신순' },
    { value: 'oldest', label: '오래된순' },
    { value: 'atoz', label: '이름순' },
  ];

  const toggleTechStack = (tech: string) => {
    setSelectedTechStacks((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  useEffect(() => {
    let result = [...projects];

    // 검색 필터링
    if (searchQuery) {
      result = result.filter((project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 카테고리 필터링
    if (selectedCategory !== 'all') {
      result = result.filter(
        (project) => project.category === selectedCategory
      );
    }

    // 기술스택 필터링
    if (selectedTechStacks.length > 0) {
      result = result.filter((project) =>
        selectedTechStacks.every((tech) => project.techStack.includes(tech))
      );
    }

    // 정렬
    switch (sortType) {
      case 'newest':
        result.sort(
          (a, b) =>
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
        break;
      case 'oldest':
        result.sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
        break;
      case 'atoz':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredProjects(result);
  }, [
    projects,
    searchQuery,
    sortType,
    selectedCategory,
    selectedTechStacks,
    setFilteredProjects,
  ]);

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
          onClearAll={() => setSelectedTechStacks([])}
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
            options={sortOptions}
            onChange={setSortType}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectToolbar;

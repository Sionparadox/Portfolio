type ProjectDetailType = 'contribution' | 'insight';

type ProjectDetailItemType = {
  id: string;
  type: ProjectDetailType;
  title: string;
  link?: string | null;
  description: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

type ProjectItemType = {
  id: string;
  slug: string;
  title: string;
  overview: string;
  description: string;
  category: string;
  thumbnail: string;
  icon: string;
  details: ProjectDetailItemType[];
  techStack: string[];
  teamSize: number;
  role?: string | null;
  startDate: Date;
  endDate?: Date | null;
  github?: string | null;
  link?: string | null;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export type { ProjectDetailItemType, ProjectDetailType, ProjectItemType };

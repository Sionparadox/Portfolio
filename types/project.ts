type ProjectItemType = {
  id: string;
  slug: string;
  title: string;
  overview: string;
  description: string;
  category: string;
  thumbnail: string;
  icon: string;
  contributions: string[];
  insights: string[];
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

export type { ProjectItemType };

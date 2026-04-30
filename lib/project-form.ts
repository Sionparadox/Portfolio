export type ProjectFormRaw = {
  title: string;
  slug: string;
  overview: string;
  description: string;
  category: string;
  teamSize: string;
  role: string;
  startDate: string;
  endDate: string;
  github: string;
  link: string;
  featured: boolean;
  order: string;
  techStack: string;
  contributions: string;
  insights: string;
};

export type ProjectFormParsed = {
  title: string;
  slug: string;
  overview: string;
  description: string;
  category: string;
  teamSize: number;
  role: string;
  startDate: Date;
  endDate: Date | null;
  github: string;
  link: string;
  featured: boolean;
  order: number;
  techStack: string[];
  contributions: string[];
  insights: string[];
};

export function extractProjectFormRaw(formData: FormData): ProjectFormRaw {
  return {
    title: (formData.get('title') as string) || '',
    slug: (formData.get('slug') as string) || '',
    overview: (formData.get('overview') as string) || '',
    description: (formData.get('description') as string) || '',
    category: (formData.get('category') as string) || '',
    teamSize: (formData.get('teamSize') as string) || '',
    role: (formData.get('role') as string) || '',
    startDate: (formData.get('startDate') as string) || '',
    endDate: (formData.get('endDate') as string) || '',
    github: (formData.get('github') as string) || '',
    link: (formData.get('link') as string) || '',
    featured: formData.get('featured') === 'on',
    order: (formData.get('order') as string) || '',
    techStack: (formData.get('techStack') as string) || '',
    contributions: (formData.get('contributions') as string) || '',
    insights: (formData.get('insights') as string) || '',
  };
}

export function hasRequiredProjectFields(raw: ProjectFormRaw): boolean {
  return Boolean(
    raw.title &&
    raw.slug &&
    raw.overview &&
    raw.description &&
    raw.category &&
    raw.startDate
  );
}

export function parseProjectForm(raw: ProjectFormRaw): ProjectFormParsed {
  return {
    title: raw.title,
    slug: raw.slug,
    overview: raw.overview,
    description: raw.description,
    category: raw.category,
    teamSize: parseInt(raw.teamSize) || 1,
    role: raw.role,
    startDate: new Date(raw.startDate),
    endDate: raw.endDate ? new Date(raw.endDate) : null,
    github: raw.github,
    link: raw.link,
    featured: raw.featured,
    order: parseInt(raw.order) || 0,
    techStack: splitComma(raw.techStack),
    contributions: splitLines(raw.contributions),
    insights: splitLines(raw.insights),
  };
}

function splitComma(value: string): string[] {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitLines(value: string): string[] {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

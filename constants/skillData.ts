import { SkillCategoryType, SkillType } from '@/types/skillType';

const skillData: Record<SkillCategoryType, SkillType[]> = {
  languages: [
    {
      name: 'JavaScript',
      percentage: 90,
      image: '/img/skills/Javascript.svg',
    },
    {
      name: 'TypeScript',
      percentage: 90,
      image: '/img/skills/Typescript.svg',
    },
    {
      name: 'Java',
      percentage: 60,
      image: '/img/skills/Java.svg',
    },
    {
      name: 'Python',
      percentage: 80,
      image: '/img/skills/Python.svg',
    },
  ],
  frontend: [
    {
      name: 'React',
      percentage: 80,
      image: '/img/skills/React.svg',
    },
    {
      name: 'Next.js',
      percentage: 90,
      image: '/img/skills/Nextjs.svg',
    },
    {
      name: 'Tailwind CSS',
      percentage: 95,
      image: '/img/skills/TailwindCSS.svg',
    },
    {
      name: 'Framer Motion',
      percentage: 80,
      image: '/img/skills/Motion.svg',
    },
  ],
  backend: [
    {
      name: 'Node.js',
      percentage: 70,
      image: '/img/skills/NodeJS.svg',
    },
    {
      name: 'Spring Boot',
      percentage: 60,
      image: '/img/skills/SpringBoot.svg',
    },
    { name: 'Prisma', percentage: 75, image: '/img/skills/Prisma.svg' },
  ],
  database: [
    {
      name: 'MySQL',
      percentage: 85,
      image: '/img/skills/MySQL.svg',
    },
    {
      name: 'PostgreSQL',
      percentage: 40,
      image: '/img/skills/PostgreSQL.svg',
    },
    {
      name: 'Redis',
      percentage: 50,
      image: '/img/skills/Redis.svg',
    },
  ],
  devops: [
    {
      name: 'Vercel',
      percentage: 70,
      image: '/img/skills/Vercel.svg',
    },
    {
      name: 'AWS',
      percentage: 70,
      image: '/img/skills/AWS.svg',
    },
    {
      name: 'Docker',
      percentage: 50,
      image: '/img/skills/Docker.svg',
    },
  ],
  others: [
    {
      name: 'Git',
      percentage: 80,
      image: '/img/skills/Git.svg',
    },
    {
      name: 'Figma',
      percentage: 70,
      image: '/img/skills/Figma.svg',
    },
  ],
};

export default skillData;

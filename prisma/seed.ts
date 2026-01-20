import { TimelineItemType } from '@/types/timeline';
import 'dotenv/config';
import { prisma } from '../lib/prisma';
import { ProjectItemType } from '../types/project';

const timelines: Omit<TimelineItemType, 'id'>[] = [
  {
    type: 'education',
    year: '2018',
    date: '2018/03 - 2024/02',
    place: '인천대학교',
    title: '인천대학교 컴퓨터공학부',
    descriptions: ['3.71/4.5 평점으로 졸업'],
    image: '/img/timeline/inu.svg',
  },
  {
    type: 'education',
    year: '2024',
    date: '2024/08 - 2025/02',
    place: '하나은행',
    title: '디지털 하나로',
    descriptions: ['풀스택 개발자 과정 수료', 'Next.js 및 Spring Boot 학습'],
    image: '/img/timeline/hana.png',
  },
  {
    type: 'certifications',
    year: '2024',
    date: '2024/06/21',
    place: '한국데이터산업진흥원(Kdata)',
    title: 'SQLD',
    descriptions: ['SQLD 자격증을 취득했습니다'],
    image: '/img/timeline/kdata.jpeg',
  },
  {
    type: 'experience',
    year: '2026',
    date: '~현재',
    place: 'x',
    title: '구직중',
    descriptions: ['웹 프론트엔드 개발자로 구직중입니다.'],
    image: '/img/Sion.jpeg',
  },
];

const projects: Omit<ProjectItemType, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    slug: 'one-hada',
    title: '원,하다',
    overview: '초개인화 금융 플랫폼 웹앱 서비스',
    description:
      '고령화 사회에서 디지털 취약계층은 점점 소외되고 있습니다. 은행점 감소, 유명무실한 기능의 전화상담, 복잡한 절차 등 다양한 이유로 인해 금융 서비스를 이용하기 어려움을 겪고 있습니다. 이러한 문제를 해결하기 위해 원,하다는 초개인화 금융 플랫폼 웹앱 서비스를 제공합니다.',
    category: 'Mobile',
    thumbnail: '/img/projects/one-hada/thumbnail.png',
    icon: '/img/projects/one-hada/icon.png',
    contributions: ['서버 아키텍처 설계', '프론트엔드 개발', '백엔드 개발'],
    insights: ['AWS 배포', 'Next 풀스택'],
    techStack: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Spring',
      'JPA',
      'MySQL',
      'Redis',
      'MongoDB',
      'Neo4J',
      'AWS',
      'GitHub Actions',
    ],
    teamSize: 7,
    role: '프론트엔드 개발자',
    startDate: new Date('2024-10-18'),
    endDate: new Date('2024-12-26'),
    github: 'https://github.com/Hanaro-Trolly/ONE-HADA-FE',
    link: null,
    featured: true,
    order: 1,
  },
  {
    slug: 'pay-all',
    title: 'PayAll',
    overview: '소비습관 관리 모바일 앱 서비스',
    description:
      '온라인 쇼핑몰마다 최저가가 달라 소비자는 여러 사이트를 번거롭게 이용 기존 마이데이터 서비스는 자산 관리에 집중, 효과적인 소비 관리기능은 부족한 상황입니다. 플랫폼 통합결제, 영수증 추적, 자산관리로 소비습관을 형성하도록 도와줍니다.',
    category: 'Mobile',
    thumbnail: '/img/projects/pay-all/thumbnail.png',
    icon: '/img/projects/pay-all/icon.png',
    contributions: ['서버 아키텍처 설계', '프론트엔드 개발'],
    insights: ['AWS 배포', 'Next 풀스택'],
    techStack: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'React Query',
      'Jotai',
      'Spring',
      'JPA',
      'MySQL',
      'Redis',
      'AWS',
      'GitHub Actions',
    ],
    teamSize: 7,
    role: '프론트엔드 개발자',
    startDate: new Date('2024-01-08'),
    endDate: new Date('2024-02-05'),
    github: 'https://github.com/UckgiDuckgi',
    link: null,
    featured: true,
    order: 2,
  },
  {
    slug: 'kkumiroom',
    title: '꾸미룸',
    overview: '고교학점제 지원 모바일 어플리케이션',
    description:
      '고교학점제의 도입으로 달라진 수업 선택 방법이 복잡해졌습니다. 또한 필요한 정보가 흩어져 있어 원하는 정보에 접근하기 어려운 상황입니다. 꾸미룸은 고교생들이 진로를 기반으로 원하는 수업을 들을 수 있도록 도와줍니다.',
    category: 'Mobile',
    thumbnail: '/img/projects/kkumiroom/thumbnail.png',
    icon: '/img/projects/kkumiroom/icon.png',
    contributions: ['프론트엔드 개발'],
    insights: ['Next 풀스택'],
    techStack: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'SWR',
      'Jotai',
      'Spring',
      'JPA',
      'MySQL',
      'Redis',
      'AWS',
      'GitHub Actions',
    ],
    teamSize: 3,
    role: '프론트엔드 개발자',
    startDate: new Date('2024-04-10'),
    endDate: new Date('2024-05-28'),
    github: 'https://github.com/KKumiRoom',
    link: null,
    featured: true,
    order: 3,
  },
];

async function main() {
  console.log('seed.ts 실행');
  await prisma.timeline.deleteMany({});
  await prisma.project.deleteMany({});
  console.log('기존 데이터 삭제 완료');

  await prisma.timeline.createMany({ data: timelines });
  console.log('timeline 데이터 생성 완료');

  await prisma.project.createMany({ data: projects });
  console.log('project 데이터 생성 완료');
}

main()
  .catch((e) => {
    console.error('seed.ts 실행 중 오류 발생:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

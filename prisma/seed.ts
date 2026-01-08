import { TimelineItemType } from '@/types/timeline';
import { prisma } from '../lib/prisma';

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

async function main() {
  console.log('seed.ts 실행');
  await prisma.timeline.deleteMany({});
  console.log('기존 데이터 삭제 완료');

  await prisma.timeline.createMany({ data: timelines });
  console.log('timeline 데이터 생성 완료');
}

main()
  .catch((e) => {
    console.error('seed.ts 실행 중 오류 발생:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

'use client';

import ExperienceRadio from '@/components/molecules/ExperienceRadio';
import Timeline from '@/components/molecules/Timeline';
import { ExperienceRadioType } from '@/types/radioGroup';
import { TimelineItemType } from '@/types/timeline';
import { useState } from 'react';

const timelineData: TimelineItemType[] = [
  {
    id: 'edu-1',
    type: 'education',
    date: '2018/03 - 2024/02',
    year: '2018',
    place: '인천대학교',
    title: '인천대학교 컴퓨터공학부',
    description: ['졸업했지롱', '입학했지롱'],
    image: '/img/Sion.jpeg',
  },
  {
    id: 'exp-1',
    type: 'experience',
    date: '2024/03 - 2024/08',
    year: '2024',
    place: '회사',
    title: '프론트엔드 개발자',
    description: [
      'React와 TypeScript를 사용한 웹 애플리케이션 개발',
      'React Native를 사용한 모바일 애플리케이션 개발',
    ],
    image: '/img/Sion.jpeg',
  },
  {
    id: 'edu-2',
    type: 'education',
    date: '2024/10 - 2025/02',
    year: '2018',
    place: '디지털 하나로',
    title: '디지털 하나로',
    description: ['풀스택 개발자 과정 수료'],
    image: '/img/Sion.jpeg',
  },
  {
    id: 'cert-1',
    type: 'certifications',
    date: '2024',
    year: '2024',
    place: 'AWS',
    title: 'AWS 자격증',
    description: ['클라우드 인프라 관리 자격증을 취득했습니다'],
    image: '/img/Sion.jpeg',
  },
];

const ExperienceSection = () => {
  const [selectedValue, setSelectedValue] =
    useState<ExperienceRadioType>('education');

  return (
    <div className='flex w-full flex-col items-center justify-center pt-4'>
      <ExperienceRadio value={selectedValue} onChange={setSelectedValue} />

      <Timeline selectedValue={selectedValue} timelineData={timelineData} />
      <div className='mt-10 h-[80vh] w-full bg-red-500'></div>
    </div>
  );
};

export default ExperienceSection;

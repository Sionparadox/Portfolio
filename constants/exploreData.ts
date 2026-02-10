import { IconType } from 'react-icons';
import { FaHome, FaUser } from 'react-icons/fa';
import { FaEnvelope, FaFileCode } from 'react-icons/fa6';

export type ExploreItem = {
  title: string;
  description: string;
  icon: IconType;
  link: string;
};

export const exploreItems: ExploreItem[] = [
  {
    title: 'Home',
    description: '저의 공간에 온 것을 환영합니다. 자유롭게 둘러보세요.',
    icon: FaHome,
    link: '/',
  },
  {
    title: 'About',
    description: '저의 가치관과 성장 과정을 따라가보세요.',
    icon: FaUser,
    link: '/about',
  },
  {
    title: 'Projects',
    description: '문제를 해결하며 쌓아온 경험과 도전의 기록을 확인해보세요.',
    icon: FaFileCode,
    link: '/projects',
  },
  {
    title: 'Contact',
    description: '새로운 인연은 언제나 환영입니다. 당신의 이야기를 들려주세요.',
    icon: FaEnvelope,
    link: '/contact',
  },
];

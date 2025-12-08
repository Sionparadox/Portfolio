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
    description: '홈스윗홈',
    icon: FaHome,
    link: '/',
  },
  {
    title: 'About',
    description: '어바웃타임',
    icon: FaUser,
    link: '/about',
  },
  {
    title: 'Projects',
    description:
      '프로젝트랄랄레로트랄랄라 프로젝트랄랄레로트랄랄라 프로젝트랄랄레로트랄랄라 프로젝트랄랄레로트랄랄라 프로젝트랄랄레로트랄랄라',
    icon: FaFileCode,
    link: '/projects',
  },
  {
    title: 'Contact',
    description: '연락해~',
    icon: FaEnvelope,
    link: '/contact',
  },
];

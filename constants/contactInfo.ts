import { Mail, MapPin, Phone } from 'lucide-react';
import { FaBlog, FaGithub } from 'react-icons/fa6';

export const CONTACT_INFO = [
  {
    icon: Phone,
    label: '010-4193-0547',
    link: 'tel:01041930547',
  },
  {
    icon: Mail,
    label: 'sions.dev@gmail.com',
    link: 'mailto:sions.dev@gmail.com',
  },
  {
    icon: MapPin,
    label: '인천광역시, 대한민국',
    link: 'https://www.google.com/maps/place/%EC%9D%B8%EC%B2%9C%EA%B4%91%EC%97%AD%EC%8B%9C+%EB%82%A8%EB%8F%99%EA%B5%AC',
  },
] as const;

export const SOCIAL_LINKS = [
  {
    icon: FaGithub,
    iconSize: 24,
    label: '깃허브',
    link: 'https://github.com/Sionparadox',
  },
  {
    icon: FaBlog,
    iconSize: 24,
    label: '블로그',
    link: 'https://sionparadox.github.io',
  },
] as const;

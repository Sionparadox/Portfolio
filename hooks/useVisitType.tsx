import { greetingMessageType } from '@/constants/greetingMessage';
import { useEffect, useState } from 'react';

export const useVisitType = (): greetingMessageType | null => {
  const [visitType, setVisitType] = useState<greetingMessageType | null>(null);
  const aWeek = 7 * 24 * 60 * 60 * 1000;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const lastVisit = localStorage.getItem('lastVisit');

    if (!lastVisit) {
      setVisitType('first');
    } else {
      const diff = Date.now() - new Date(lastVisit).getTime();
      setVisitType(diff < aWeek ? 'withinAWeek' : 'afterAWeek');
    }

    localStorage.setItem('lastVisit', new Date().toISOString());
  }, []);

  return visitType;
};

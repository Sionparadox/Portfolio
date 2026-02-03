import { greetingMessageType } from '@/constants/greetingMessage';
import { useEffect, useState } from 'react';

const aWeek = 7 * 24 * 60 * 60 * 1000;

export const useVisitType = (): greetingMessageType => {
  const [visitType, setVisitType] =
    useState<greetingMessageType>('withinAWeek');

  useEffect(() => {
    // 클라이언트에서만 실행되어 hydration mismatch 방지
    const lastVisit = localStorage.getItem('lastVisit');

    let type: greetingMessageType;
    if (!lastVisit) {
      type = 'first';
    } else {
      const diff = Date.now() - new Date(lastVisit).getTime();
      type = diff < aWeek ? 'withinAWeek' : 'afterAWeek';
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisitType(type);
    localStorage.setItem('lastVisit', new Date().toISOString());
  }, []);

  return visitType;
};

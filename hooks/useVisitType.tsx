import { greetingMessageType } from '@/constants/greetingMessage';
import { useEffect, useRef, useState } from 'react';

const A_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const LAST_VISIT_KEY = 'lastVisit';

const isSameLocalDate = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const getVisitInfoData = (): VisitInfoBase => {
  if (typeof window === 'undefined') {
    return { visitType: 'first', visitedToday: false };
  }

  const lastVisitRaw = localStorage.getItem(LAST_VISIT_KEY);
  if (!lastVisitRaw) {
    return { visitType: 'first', visitedToday: false };
  }

  const lastVisitDate = new Date(lastVisitRaw);
  if (Number.isNaN(lastVisitDate.getTime())) {
    return { visitType: 'first', visitedToday: false };
  }

  const now = new Date();
  const diff = now.getTime() - lastVisitDate.getTime();

  return {
    visitType: diff < A_WEEK_MS ? 'withinAWeek' : 'afterAWeek',
    visitedToday: isSameLocalDate(lastVisitDate, now),
  };
};

type VisitInfoBase = {
  visitType: greetingMessageType;
  visitedToday: boolean;
};

type VisitInfo = VisitInfoBase & {
  ready: boolean;
};

export const useVisitInfo = (): VisitInfo => {
  const [visitInfo, setVisitInfo] = useState<VisitInfo>({
    visitType: 'first',
    visitedToday: false,
    ready: false,
  });

  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const info = getVisitInfoData();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisitInfo({ ...info, ready: true });

    if (typeof window !== 'undefined') {
      localStorage.setItem(LAST_VISIT_KEY, new Date().toISOString());
    }
  }, []);

  return visitInfo;
};

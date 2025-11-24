import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export type ThemeType = 'light' | 'dark';

// 시스템 테마 감지
export const getSystemTheme = (): ThemeType => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

// localStorage에 저장되는 테마 (null이면 시스템 테마 사용)
export const storedThemeAtom = atomWithStorage<ThemeType | null>(
  'theme',
  null,
  {
    getItem: (key) => {
      if (typeof window === 'undefined') return null;
      const stored = localStorage.getItem(key);
      return stored === 'light' || stored === 'dark' ? stored : null;
    },
    setItem: (key, value) => {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    },
    removeItem: (key) => {
      localStorage.removeItem(key);
    },
  }
);

// 시스템 테마 변경 감지를 위한 trigger atom
export const systemThemeTriggerAtom = atom(false);

// 실제 사용되는 테마
export const themeAtom = atom(
  (get) => {
    // 시스템 테마 변경 감지를 위해 trigger atom 구독
    get(systemThemeTriggerAtom);
    const stored = get(storedThemeAtom);
    return stored ?? getSystemTheme();
  },
  (get, set, newTheme: ThemeType) => {
    set(storedThemeAtom, newTheme);
  }
);

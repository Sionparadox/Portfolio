import { getCurrentThemeFromDOM, type ThemeType } from '@/utils/theme';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const storedThemeAtom = atomWithStorage<ThemeType | null>('theme', null);

export const systemThemeTriggerAtom = atom(false);

export const themeAtom = atom(
  (get) => {
    get(systemThemeTriggerAtom);
    const stored = get(storedThemeAtom);

    if (stored) return stored;

    return getCurrentThemeFromDOM();
  },
  (get, set, newTheme: ThemeType) => {
    set(storedThemeAtom, newTheme);

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
);

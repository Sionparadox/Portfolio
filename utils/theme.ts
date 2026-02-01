export type ThemeType = 'light' | 'dark';

/**
 * localStorage에서 저장된 테마를 가져옵니다.
 * Jotai의 JSON 저장 방식으로 인한 따옴표를 제거합니다.
 */
export const getStoredTheme = (): ThemeType | null => {
  if (typeof window === 'undefined') return null;

  const stored = localStorage.getItem('theme');
  if (!stored) return null;

  const cleanTheme = stored.replace(/"/g, '');
  return cleanTheme === 'light' || cleanTheme === 'dark' ? cleanTheme : null;
};

/**
 * 시스템 테마를 감지합니다.
 */
export const getSystemTheme = (): ThemeType => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

/**
 * 초기 테마를 결정합니다.
 * 우선순위: localStorage > 시스템 테마 > 기본값(light)
 */
export const getInitialTheme = (): ThemeType => {
  const stored = getStoredTheme();
  return stored ?? getSystemTheme();
};

/**
 * DOM에서 현재 테마를 읽어옵니다.
 * SSR 이후 클라이언트에서 실제 적용된 테마를 확인할 때 사용합니다.
 *
 * 사용 케이스: layout.tsx의 blocking script가 설정한 테마를
 * 클라이언트 컴포넌트에서 읽어올 때
 */
export const getCurrentThemeFromDOM = (): ThemeType => {
  if (typeof window === 'undefined') return 'light';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
};

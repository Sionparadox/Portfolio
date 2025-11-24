'use client';

import { useTheme } from '@/hooks/useTheme';
import { LucideMoon, LucideSun } from 'lucide-react';
import { Button } from '../atoms/Button';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button variant='ghost' size='icon' onClick={toggleTheme}>
      {theme === 'dark' ? <LucideSun /> : <LucideMoon />}
    </Button>
  );
};

export default ThemeToggleButton;

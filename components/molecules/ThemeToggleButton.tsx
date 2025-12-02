'use client';

import { themeAtom } from '@/atoms/theme';
import { useTheme } from '@/hooks/useTheme';
import { useAtomValue } from 'jotai';
import { LucideMoon, LucideSun } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from '../atoms/Button';

const ThemeToggleButton = () => {
  const { toggleTheme, mounted } = useTheme();
  const theme = useAtomValue(themeAtom);

  // Hydration 불일치 방지: mounted 전에는 빈 버튼 렌더링
  if (!mounted) {
    return (
      <Button variant='ghost' size='icon' className='relative'>
        <span className='h-4 w-4' />
      </Button>
    );
  }

  return (
    <Button variant='ghost' size='icon' onClick={toggleTheme} asChild>
      <motion.button
        whileHover={{ rotate: -45 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.15 }}
        className='relative'
      >
        <AnimatePresence mode='wait' initial={false}>
          {theme === 'dark' ? (
            <motion.div
              key='sun'
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <LucideSun />
            </motion.div>
          ) : (
            <motion.div
              key='moon'
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <LucideMoon />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </Button>
  );
};

export default ThemeToggleButton;

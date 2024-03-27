'use client';
import { useTheme } from 'next-themes';
import { ModeToggle } from '@/themes/ThemeChanging';
import { ThemeProvider } from '@/themes/ThemeProvider';

const CurrentTheme = (current: string): boolean => {
  const { theme } = useTheme();

  return theme === current;
};

export { ModeToggle, ThemeProvider, CurrentTheme };

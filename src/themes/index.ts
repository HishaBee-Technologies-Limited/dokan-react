"use client";
import { useTheme } from "next-themes";
import { ModeToggle } from "./ThemeChanging";
import { ThemeProvider } from "./ThemeProvider";

const CurrentTheme = (current: string): boolean => {
  const { theme } = useTheme();

  return theme === current;
};

export { ModeToggle, ThemeProvider, CurrentTheme };

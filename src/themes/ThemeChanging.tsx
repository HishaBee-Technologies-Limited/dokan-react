'use client';

import { useTheme } from 'next-themes';
import Icon from '@/components/common/Icon';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild className="focus:outline-none">
    <Button
      size="icon"
      variant="transparent"
      className="text-primary-90 dark:text-white text-lg focus:outline-none"
      onClick={() => (theme == 'dark' ? setTheme('light') : setTheme('dark'))}
    >
      <Icon
        icon="iconoir:sun-light"
        className=" rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Icon
        icon="arcticons:dark-launcher"
        className="absolute  rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
    </Button>
  );
}

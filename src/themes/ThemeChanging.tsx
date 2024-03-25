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
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus:outline-none">
        <Button
          size="icon"
          variant="transparent"
          className="text-primary-90 dark:text-white text-lg focus:outline-none"
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
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white dark:bg-primary-80 dark:border-none w-[10rem]"
      >
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        {/* <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

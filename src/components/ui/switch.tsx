'use client';

import React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'peer inline-flex h-space24 w-[4.4rem] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary-90 data-[state=unchecked]:bg-primary-50 dark:focus-visible:ring-neutral-300 dark:focus-visible:ring-offset-primary-100 dark:data-[state=checked]:bg-primary-20 dark:data-[state=unchecked]:bg-primary-80',
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'pointer-events-none block h-[2rem] w-[2rem] rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[2rem] data-[state=unchecked]:translate-x-0 dark:bg-primary-100'
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };

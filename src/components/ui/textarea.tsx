import React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-lg border border-primary-20 bg-white px-space12 py-space8 text-sm ring-offset-white placeholder:text-text300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-70 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-primary-90 dark:bg-primary-100 dark:ring-offset-primary-80 dark:placeholder:text-text500 dark:focus-visible:ring-primary-90',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };

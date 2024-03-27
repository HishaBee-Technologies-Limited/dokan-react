'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex gap-space8 items-center justify-center whitespace-nowrap rounded-lg text-sm sm:text-md font-semibold ring-offset-primary-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group',
  {
    variants: {
      variant: {
        default:
          'bg-primary-90 dark:bg-primary-100 text-white dark:text-text300 hover:bg-primary-100 shadow-sm hover:shadow-lg',
        transparent:
          'bg-transparent text-text500 dark:text-text300 hover:bg-transparent',
        danger:
          'bg-error-90 dark:bg-error-100 text-white hover:bg-error-100 shadow-sm shadow-error-100 hover:shadow-md',
        success:
          'bg-success-90 dark:bg-success-100 text-white hover:bg-success-100 shadow-sm shadow-success-100 hover:shadow-md',
        secondary:
          'bg-white dark:bg-primary-90 dark:text-text400 text-text500 hover:bg-white border border-color shadow-sm hover:shadow-md',
        outline:
          'border border-color bg-transparent hover:bg-white dark:hover:bg-primary-90 text-text500 dark:text-text400 shadow-sm hover:shadow-md',
      },
      size: {
        default: 'h-[4.8rem] px-space12 sm:px-space24 py-space8',
        icon: 'rounded-full',
        sm: 'h-[3.6rem] px-space8 sm:px-space16 py-space6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };

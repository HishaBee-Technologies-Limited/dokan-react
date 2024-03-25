import React from 'react';
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip as TooltipComponent,
} from '@/components/ui/tooltip';

type ITooltipProps = {
  triggerClass?: string;
  contentClass?: string;
  trigger: React.ReactNode | string;
  children: React.ReactNode | string;
};

const Tooltip = ({
  trigger,
  triggerClass,
  contentClass,
  children,
}: ITooltipProps) => {
  return (
    <TooltipProvider>
      <TooltipComponent>
        <TooltipTrigger className={triggerClass}>{trigger}</TooltipTrigger>
        <TooltipContent className={contentClass}>{children}</TooltipContent>
      </TooltipComponent>
    </TooltipProvider>
  );
};

export default Tooltip;

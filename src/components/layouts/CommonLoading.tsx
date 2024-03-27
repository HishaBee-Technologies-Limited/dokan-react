import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const CommonLoading = () => {
  return (
    <div className="space-y-space40">
      <div className="flex justify-between gap-space24">
        <Skeleton className="h-space40 w-full max-w-[20rem]" />
        <Skeleton className="h-space40 w-full max-w-[20rem]" />
      </div>

      <div className="flex justify-between gap-space24">
        <div className="w-full space-y-space8">
          <Skeleton className="h-[12rem] w-full rounded-xl" />

          <Skeleton className="h-space24 w-full" />
          <Skeleton className="h-space24 w-2/3" />
        </div>
        <div className="w-full space-y-space8">
          <Skeleton className="h-[12rem] w-full rounded-xl" />

          <Skeleton className="h-space24 w-full" />
          <Skeleton className="h-space24 w-2/3" />
        </div>
        <div className="w-full space-y-space8">
          <Skeleton className="h-[12rem] w-full rounded-xl" />

          <Skeleton className="h-space24 w-full" />
          <Skeleton className="h-space24 w-2/3" />
        </div>
      </div>

      <Skeleton className="h-[40rem] w-full rounded-xl" />
    </div>
  );
};

export default CommonLoading;

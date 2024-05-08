'use client';
import Icon from '@/components/common/Icon';
import { Text } from '@/components/common/text';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
  return (
    <main>
      <div className="max-w-max px-space40 flex flex-col items-center justify-center gap-space16 mt-space40 background rounded-md shadow-md border border-error-50 p-space12">
        <div className="flex items-center gap-space16">
          <Icon
            icon="fluent:globe-error-20-regular"
            height={44}
            width={44}
            color="#FF5959"
          />
          <Text
            title="Oops!"
            className="text-[3.2rem] font-bold"
            variant="error"
          />
        </div>
        <Text
          title="Something is Wrong"
          variant="secondary"
          className="text-lg"
        />
      </div>
    </main>
  );
}

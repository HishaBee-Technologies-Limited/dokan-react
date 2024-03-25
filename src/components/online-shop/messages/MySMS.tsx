import React from 'react';
import { Text } from '@/components/common/text';
import { Image } from '@/components/common/Image';

const MySMS = () => {
  return (
    <div className="flex items-start gap-space8 flex-row-reverse">
      <Image
        alt=""
        src={''}
        width={20}
        height={20}
        icon="solar:user-bold"
        wrapperClasses="bg-primary-30 rounded-full h-space24 w-space24 flex items-center justify-center"
      />
      <article className="max-w-[22rem]">
        <Text
          variant="white"
          className="text-sm bg-blue-500 dark:bg-blue-700 rounded-md px-space8 py-space4"
        >
          আজই অনলাইন শপ খুলে আপনার আজই অনলাইন শপ
        </Text>

        <Text
          title="28-feb-2024, 10:00 pm"
          variant="secondary"
          className="text-xs mt-space4 text-end"
        />
      </article>
    </div>
  );
};

export default MySMS;

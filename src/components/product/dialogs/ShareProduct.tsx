import React from 'react';
import Icon from '@/components/common/Icon';
import { Text } from '@/components/common/text';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/common/Image';
import { ArrowForwardIcon } from '@/components/common/icons';

export const ShareProduct = () => {
  return (
    <div className="py-space16 px-space16 pb-space32 space-y-space16">
      <Text
        title="Share the Product Link"
        className="font-medium text-center"
      />

      <div className="rounded-lg px-space12 py-space12 flex items-center gap-space16 bg-primary-10 dark:bg-primary-80">
        <Text title={`https://hishabee.com`} className="font-medium" />

        <Button size={'icon'} variant={'transparent'}>
          <Icon icon="material-symbols:file-copy-outline-rounded" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-space16">
        <Button
          variant={'transparent'}
          className="bg-primary-10 hover:bg-primary-10 dark:bg-primary-80 dark:hover:bg-primary-80"
        >
          <Icon icon="icon-park-twotone:recent-views-sort" />
          <Text title="Link Visit URL" className="font-medium" />
        </Button>
        <Button
          variant={'transparent'}
          className="bg-primary-10 hover:bg-primary-10 dark:bg-primary-80 dark:hover:bg-primary-80"
        >
          <Icon icon="material-symbols:file-copy-rounded" />
          Copy Link
        </Button>
      </div>

      <Button
        variant={'transparent'}
        className="w-full bg-primary-10 hover:bg-primary-10 dark:bg-primary-80 dark:hover:bg-primary-80 justify-between"
      >
        <div className="flex gap-space12 items-center">
          <Icon icon="fa6-solid:comment-sms" height={24} width={24} />
          <Text title="SMS" className="text-lg font-semibold" />
        </div>

        <ArrowForwardIcon color="blue" />
      </Button>

      <Text
        title="Share Link"
        className="text-lg font-semibold py-space16 text-center"
      />

      <div className="flex flex-wrap items-center gap-space24 justify-around">
        <div className="space-y-space4 text-center">
          <Button variant={'transparent'} size={'icon'}>
            <Icon icon="logos:google-gmail" height={54} width={54} />
          </Button>
          <Text title="Email" className="text-lg font-semibold" />
        </div>
        <div className="space-y-space8 text-center">
          <Button variant={'transparent'} size={'icon'}>
            <Image
              src={'/images/social/messenger.svg'}
              alt=""
              height={54}
              width={54}
            />
          </Button>
          <Text title="Email" className="text-lg font-semibold" />
        </div>
        <div className="space-y-space8 text-center">
          <Button variant={'transparent'} size={'icon'}>
            <Icon
              icon="ic:sharp-whatsapp"
              height={54}
              width={54}
              color="green"
            />
          </Button>
          <Text title="Whatsapp" className="text-lg font-semibold" />
        </div>
        <div className="space-y-space8 text-center">
          <Button variant={'transparent'} size={'icon'}>
            <Icon
              icon="icon-park-outline:application-menu"
              height={54}
              width={54}
              color="blue"
            />
          </Button>
          <Text title="Others" className="text-lg font-semibold" />
        </div>
      </div>
    </div>
  );
};

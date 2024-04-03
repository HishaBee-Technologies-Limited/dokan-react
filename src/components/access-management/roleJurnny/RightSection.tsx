'use client';
import React from 'react';
import Card from '@/components/common/Card';
import Icon from '@/components/common/Icon';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { EditIcon } from '@/components/common/icons';
import { ScrollArea } from '@/components/ui/scroll-area';
import FallBackImage from '@/components/common/FallBackImage';
import AccessibleFeatureList from '@/components/access-management/AccessibleFeatureList';

export const RightSection = () => {
  return (
    <Card className="h-full flex flex-col lg:w-8/12">
      <div className="px-space16 my-space8 border-b border-primary-20 dark:border-primary-80">
        <div className="flex items-center gap-space8 py-space8">
          <FallBackImage src={''} fallback={'M'} />
          <article>
            <div className="flex items-center gap-space12">
              <Text title={'User 1'} className="text-lg font-medium" />
              <Text
                title={'Manager'}
                className="text-sm font-medium px-space8 py-[.2rem] rounded-md bg-warning-40 uppercase"
              />
            </div>
            <Text variant="muted">{'01798998989'} </Text>
          </article>
        </div>
      </div>

      <div className="px-space16 pt-space8 space-y-space12">
        <div className="flex justify-between items-center gap-space12">
          <article>
            <Text title={'এপের লিংক পাঠান'} className="font-semibold" />
            <Text
              title={'ইউজারের মোবাইল নাম্বার দিয়ে লগ ইন করলে এপের এক্সেস পাবে '}
              variant="muted"
            />
          </article>

          <Button variant={'secondary'} className="shadow-md">
            <Icon icon="material-symbols:file-copy-outline-rounded" />
            Copy Link
          </Button>
        </div>

        <div className="flex justify-between items-center gap-space12">
          <Text title={'যেসব ফিচারে এক্সেস পাবে'} className="font-semibold" />
          <Button variant={'transparent'} className="!px-0">
            <Icon icon="bx:edit" />
            পদবী এডিট
          </Button>
        </div>
      </div>

      <ScrollArea className="h-full pb-space16 px-space16">
        <AccessibleFeatureList />
      </ScrollArea>

      <div className="p-space16 border-t border-primary-20 dark:border-primary-80 flex gap-space12 justify-end">
        <Button variant={'danger'} className="w-full max-w-[20rem]">
          <Icon icon="mingcute:user-remove-fill" />
          Delete
        </Button>

        <Button className="w-full max-w-[20rem]">
          <EditIcon />
          Edit
        </Button>
      </div>
    </Card>
  );
};

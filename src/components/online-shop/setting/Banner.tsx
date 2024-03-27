import React from 'react';
import Card from '@/components/common/Card';
import Icon from '@/components/common/Icon';
import { Text } from '@/components/common/text';
import { Button } from '@/components/ui/button';
import { CancelIcon } from '@/components/common/icons';

const Banner = () => {
  return (
    <div className="w-full space-y-space16">
      <Card className="p-space12 space-y-space12">
        <Text title="Current banner" className="font-semibold" />

        <div className="flex gap-space16 overflow-hidden py-space12">
          <div className="bg-primary-5 max-w-[50rem] w-full min-w-[30rem] min-h-[10rem] rounded-md border-[.6rem] border-color relative">
            <Button
              size={'icon'}
              variant={'danger'}
              className="absolute -right-space12 -top-space12"
            >
              <CancelIcon />
            </Button>
          </div>
          <div className="bg-primary-5 max-w-[50rem] w-full min-w-[30rem] min-h-[10rem] rounded-md border-[.6rem] border-color relative"></div>
        </div>
      </Card>

      <Card className="p-space12 space-y-space12 pb-space24">
        <Text title="Add new banner" className="font-semibold" />

        <div className="flex flex-col items-center justify-center gap-space16 py-space12">
          <Icon icon="ic:outline-add-photo-alternate" height={84} width={84} />

          <label className="cursor-pointer">
            <input type="file" className="hidden" />

            <p className="text-blue-600 text-sm font-medium text-center">
              Add your new website banner
            </p>
          </label>
        </div>
      </Card>

      <div className="flex justify-end gap-space16">
        <Button variant={'secondary'}>Cancel</Button>
        <Button>Update</Button>
      </div>
    </div>
  );
};

export default Banner;

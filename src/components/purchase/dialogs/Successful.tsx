'use client';
import React from 'react';
import Icon from '@/components/common/Icon';
import { Text } from '@/components/common/text';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/common/Image';
import { usePurchaseStore } from '@/stores/usePurchase';
import { DialogFooter } from '@/components/common/Dialog';

const Successful = () => {
  const handleClose = usePurchaseStore((state) => state.setDialogState);

  return (
    <>
      <div className="py-space16 mx-auto max-w-[26.4rem] space-y-space40">
        <div className="flex items-center flex-col gap-space16">
          <div className="h-[6.4rem] w-[6.4rem] rounded-full flex items-center justify-center bg-success-40 text-success-100">
            <Icon icon="icon-park-solid:success" height={32} width={32} />
          </div>

          <Text
            title="Buy Successful"
            variant="success"
            className="text-xl font-bold"
          />
        </div>

        <article className="space-y-space8">
          <article className="flex justify-between gap-space8">
            <Text title="Buy Amount" />
            <Text title="৳ 12,000" className="font-semibold" />
          </article>
          <article className="flex justify-between gap-space8 border-b border-color">
            <Text title="Payment Amount" />
            <Text title="৳ 12,000" className="font-semibold" />
          </article>
          <article className="flex justify-between gap-space8">
            <Text title="Due" />
            <Text title="৳ 00" className="font-semibold" variant="error" />
          </article>

          <Text
            title="Date: 14 July 2022 | 12:55 pm"
            className="text-sm text-center pt-space16"
          />
        </article>

        <div className="grid grid-cols-2 gap-space16">
          <Button className="w-full h-[9.6rem] flex-col" variant="secondary">
            <Image
              src="/images/print_receipt.svg"
              alt=""
              height={36}
              width={36}
            />

            <Text title="Print Receipt" className="text-sm font-medium" />
          </Button>
          <Button className="w-full h-[9.6rem] flex-col" variant="secondary">
            <Image
              src="/images/share_receipt.svg"
              alt=""
              height={36}
              width={36}
            />

            <Text title="Share receipt " className="text-sm font-medium" />
          </Button>
        </div>
      </div>

      <DialogFooter>
        <Button className="w-full" variant={'secondary'}>
          Close
        </Button>
      </DialogFooter>
    </>
  );
};

export default Successful;

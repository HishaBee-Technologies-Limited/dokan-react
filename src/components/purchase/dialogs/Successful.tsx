'use client';
import React from 'react';
import Icon from '@/components/common/Icon';
import { Text } from '@/components/common/text';
import { Button } from '@/components/ui/button';
import { usePurchaseStore } from '@/stores/usePurchase';
import { DialogFooter } from '@/components/common/Dialog';
import { usePurchase } from '@/stores/usePurchaseStore';
import { getCookie } from 'cookies-next';
import PDFGenerator from '@/components/common/PDFGenerator';

const Successful = () => {
  const handleClose = usePurchaseStore((state) => state.setDialogState);
  const calculatedProducts = usePurchase((state) => state.calculatedProducts);
  const clearProductArray = usePurchase((state) => state.setProducts);
  const shop = getCookie('shop');

  const due =
    calculatedProducts?.totalPrice! - calculatedProducts?.paymentAmount!;

  return (
    <>
      <div className="py-space16 mx-auto max-w-[26.4rem] space-y-space40">
        <div className="flex items-center flex-col gap-space16">
          <div className="h-[6.4rem] w-[6.4rem] rounded-full flex items-center justify-center bg-success-40 text-success-100">
            <Icon icon="icon-park-solid:success" height={32} width={32} />
          </div>

          <Text
            title="Purchase Successful"
            variant="success"
            className="text-xl font-bold"
          />
        </div>

        <div className="">
          <PDFGenerator
            calculatedProducts={calculatedProducts}
            shop={shop}
            due={due}
          />
        </div>
      </div>

      <DialogFooter>
        <Button
          onClick={() => {
            handleClose({ open: false });
            clearProductArray([]);
          }}
          className="w-full"
          variant={'secondary'}
        >
          Close
        </Button>
      </DialogFooter>
    </>
  );
};

export default Successful;

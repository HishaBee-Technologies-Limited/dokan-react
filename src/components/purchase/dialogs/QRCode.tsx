'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { usePurchaseStore } from '@/stores/usePurchase';
import { DialogFooter } from '@/components/common/Dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const QRCodeTabs = ['bkash', 'nagad', 'rocket', 'other'];

const QRCode = () => {
  const handleClose = usePurchaseStore((state) => state.setDialogState);

  return (
    <div>
      <Tabs defaultValue={QRCodeTabs[0]}>
        <div className="border-b border-color py-space16 px-space16">
          <TabsList className="grid grid-cols-4">
            {QRCodeTabs.map((tab) => (
              <TabsTrigger key={tab} value={tab} className="uppercase">
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {QRCodeTabs.map((tab) => (
          <TabsContent
            key={tab}
            value={tab}
            className="flex flex-col gap-space12 items-center mt-space8 text-center"
          >
            <div className="h-[30rem] w-[30rem] border border-color rounded-md"></div>
            <input id={tab} type="file" className="hidden" />
            <label htmlFor={tab} className="font-semibold text-action-100">
              Add QR Code
            </label>
          </TabsContent>
        ))}
      </Tabs>

      <DialogFooter>
        <Button size={'sm'} className="w-full">
          Payment Received
        </Button>
      </DialogFooter>
    </div>
  );
};

export default QRCode;

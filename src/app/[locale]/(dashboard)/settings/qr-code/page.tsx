'use client';
import React, { useState } from 'react';
import { PageSubTitle } from '@/components/common/text';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Image } from '@/components/common/Image';
import { Button } from '@/components/ui/button';
import { QRCodeDataType } from '@/types/TabWithQRCode';
import { InitialQRCodeTabs } from '@/config/tabWithQRCode';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';

const QRCode = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setQueryString } = useCreateQueryString();
  const [qRCodeData, setQRCodeData] =
    useState<QRCodeDataType[]>(InitialQRCodeTabs);

  const handleTab = (tab: QRCodeDataType['tabNav']) => {
    setQueryString('activeTab', tab);
    router.replace(`${pathname}?activeTab=${tab}`, { scroll: false });
  };

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;

    if (files) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setQRCodeData((prevState) =>
            prevState.map((item) =>
              item.tabNav === name
                ? { ...item, qr_code: reader.result as string }
                : item
            )
          );
        }
      };

      reader.readAsDataURL(files[0]);
    }
  };

  const handleSave = async () => {
    console.log('saved');
    // addQrCode({
    //     type: 'BKASH',
    //     shop_id: 1885,
    //     image_src: 'xyz'
    // }).then((response)=> {
    //     console.log({response})
    // })
  };

  return (
    <div className="space-y-space16">
      <PageSubTitle title="Setup your payment QR Code" />

      <div className="max-w-[53rem]">
        <Tabs
          defaultValue={searchParams.get('activeTab') ?? qRCodeData[0].tabNav}
        >
          <div className="border-b border-color py-space16 px-space16">
            <TabsList className="grid grid-cols-4">
              {qRCodeData.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.tabNav}
                  name={tab.tabNav}
                  onClick={() => handleTab(tab.tabNav)}
                  className="uppercase"
                >
                  {tab.tabNav}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="mt-space8">
            {qRCodeData.map((tab) => (
              <TabsContent key={tab.id} value={tab.tabNav}>
                <label
                  htmlFor={tab.tabNav}
                  className="flex flex-col gap-space12 items-center text-center h-[30rem] w-[30rem] mx-auto"
                >
                  <div className="relative w-full h-full overflow-hidden p-10 border border-color rounded-md background flex items-center justify-center">
                    <Image
                      className="rounded-md w-full h-full"
                      wrapperClasses="w-full h-full"
                      src={tab.qr_code ? tab.qr_code : '/images/empty_qr.svg'}
                      height={236}
                      width={236}
                      alt={tab.tabNav}
                    />
                  </div>

                  <input
                    type="file"
                    id={tab.tabNav}
                    name={tab.tabNav}
                    onChange={handleFile}
                    className="hidden"
                    accept="image/png, image/jpeg"
                  />
                  <div className="font-semibold text-action-100">
                    Add/Change QR Code
                  </div>
                </label>
              </TabsContent>
            ))}
          </div>
        </Tabs>

        <div className="flex justify-end gap-space12 mt-space16">
          <Button variant={'secondary'} className="!px-space40">
            Cancel
          </Button>
          <Button onClick={handleSave} className="!px-space40">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QRCode;

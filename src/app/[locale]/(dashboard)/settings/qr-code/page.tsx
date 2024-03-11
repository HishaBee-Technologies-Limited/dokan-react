'use client'
import React, { useState } from "react";
import { PageSubTitle } from '@/components/common/text'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Image } from '@/components/common/Image'
import { Button } from '@/components/ui/button'
import { QRCodeDataType } from "@/types/TabWithQRCode";
import { InitialQRCodeTabs } from "@/config/tabWithQRCode";

const QRCode = () => {
    const [qRCodeData, setQRCodeData] = useState<QRCodeDataType[]>(InitialQRCodeTabs)
    return (
        <div className='space-y-space16'>
            <PageSubTitle title='Setup your payment QR Code' />

            <div className="max-w-[53rem]">
                <Tabs defaultValue={qRCodeData[0].tabNav}>
                    <div className="border-b border-color py-space16 px-space16">
                        <TabsList className='grid grid-cols-4'>
                            {qRCodeData.map((tab) => (
                                <TabsTrigger key={tab.id} value={tab.tabNav} className="uppercase">{tab.tabNav}</TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    <div className="mt-space8">
                        {qRCodeData.map((tab) => (
                          <TabsContent key={tab.id} value={tab.tabNav} >
                              <label htmlFor={tab.tabNav} className='flex flex-col gap-space12 items-center text-center'>
                                  <div
                                    className="h-[30rem] w-[30rem] border border-color rounded-md background flex items-center justify-center">
                                      <Image src={!!tab.qr_code? tab.qr_code : '/images/empty_qr.svg'} height={236} width={236} alt={tab.tabNav} />
                                  </div>

                                  <input id={tab.tabNav} type="file" className='hidden' />
                                  <div className='font-semibold text-action-100'>Add/Change QR Code</div>
                              </label>
                          </TabsContent>
                        ))}
                    </div>
                </Tabs>


                <div className="flex justify-end gap-space12 mt-space16">
                    <Button variant={'secondary'} className='!px-space40'>Cancel</Button>
                    <Button className='!px-space40'>Save</Button>
                </div>
            </div>
        </div>
    )
}

export default QRCode
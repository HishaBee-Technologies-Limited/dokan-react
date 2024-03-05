'use client'
import React from 'react'
import { PageSubTitle } from '../../../../../components/common/text'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../../components/ui/tabs'
import { Image } from '../../../../../components/common/Image'
import { Button } from '../../../../../components/ui/button'

const QRCodeTabs = ["bkash", "nagad", "rocket", "other"]

const QRCode = () => {
    return (
        <div className='space-y-space16'>
            <PageSubTitle title='Setup your payment QR Code' />

            <div className="max-w-[53rem]">
                <Tabs defaultValue={QRCodeTabs[0]}>
                    <div className="border-b border-color py-space16 px-space16">
                        <TabsList className='grid grid-cols-4'>
                            {QRCodeTabs.map((tab) => (
                                <TabsTrigger key={tab} value={tab} className="uppercase">{tab}</TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    {QRCodeTabs.map((tab) => (
                        <TabsContent key={tab} value={tab} className='flex flex-col gap-space12 items-center mt-space8 text-center'>
                            <div className="h-[30rem] w-[30rem] border border-color rounded-md background flex items-center justify-center">
                                <Image src={`/images/empty_qr.svg`} height={236} width={236} alt='qr' />
                            </div>
                            <input id={tab} type="file" className='hidden' />
                            <label htmlFor={tab} className='font-semibold text-action-100'>Add/Change QR Code</label>
                        </TabsContent>
                    ))}
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
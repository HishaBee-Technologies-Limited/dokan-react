'use client'
import React, { useState } from 'react'
import Card from '@/components/common/Card'
import { Input } from '@/components/ui/input'
import CustomTab from '@/components/common/Tab'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/common/text'
import FallBackImage from '@/components/common/FallBackImage'
import WrapperOddList from '@/components/common/WrapperOddList'
import { Drawer, DrawerFooter } from '@/components/common/Drawer'
import CardWithSideIndicator from '@/components/common/CardWithSideIndicator'

const tabData = [
    {
        label: "Customer",
        value: "Customer"
    },
    {
        label: "Supplier",
        value: "Supplier"
    },
    {
        label: "Employee",
        value: "Employee"
    },
]

export const LeftSection = () => {
    const [active, setActive] = useState<string>("Customer")
    const [activeIndex, setActiveIndex] = useState<number>(0)
    const [openDrawer, setOpenDrawer] = useState<boolean>(false)

    return (
        <>
            <Card className='h-full lg:w-4/12 flex flex-col gap-space16'>
                <div className="space-y-space8 w-full">
                    <CustomTab
                        data={tabData}
                        active={active}
                        handleChange={(item) => setActive(item.value)}
                        className='border-b w-full px-space16 pt-space8'
                    />
                    <div className="px-space16">
                        <Input placeholder="Search contact" />
                    </div>
                </div>

                <div className="h-[calc(100%-20.6rem)] overflow-y-scroll px-space16">
                    <WrapperOddList>
                        {Array(40).fill(0).map((_, index) => (
                            <CardWithSideIndicator
                                key={index}
                                active={index === activeIndex}
                                onClick={() => setActiveIndex(index)}
                            >
                                <div className="flex items-center gap-space8">
                                    <FallBackImage src='' fallback='MM' />
                                    <article>
                                        <Text title='নিজাম উদ্দিন' className='!text-md font-medium' />
                                        <Text title='01542141414' variant='muted' />
                                    </article>
                                </div>
                            </CardWithSideIndicator>
                        ))}
                    </WrapperOddList>
                </div>

                <div className="p-space16 border-t border-primary-20 dark:border-primary-80">
                    <Button onClick={() => setOpenDrawer(!openDrawer)} className='w-full' >Add {active}</Button>
                </div>
            </Card>

            <Drawer
                open={openDrawer}
                header={`Add ${active}`}
                onClose={(open) => setOpenDrawer(open)}
            >
                <div className='h-full'>
                    <DrawerFooter>
                        <Button>Button</Button>
                    </DrawerFooter>
                </div>
            </Drawer>
        </>
    )
}
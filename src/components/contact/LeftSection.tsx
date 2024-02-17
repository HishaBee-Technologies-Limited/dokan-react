'use client'
import React, { useState } from 'react'
import Card from '@/components/common/Card'
import { Input } from '@/components/ui/input'
import CustomTab from '@/components/common/Tab'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/common/text'
import FallBackImage from '@/components/common/FallBackImage'
import WrapperOddList from '@/components/common/WrapperOddList'
import CardWithSideIndicator from '@/components/common/CardWithSideIndicator'

const tabData = [
    {
        label: "Customer",
        value: "customer"
    },
    {
        label: "Supplier",
        value: "supplier"
    },
    {
        label: "Employee",
        value: "employee"
    },
]


export const LeftSection = () => {
    const [active, setActive] = useState<string>("customer")

    return (
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
                    <CardWithSideIndicator active={true}>
                        <div className="flex items-center gap-space8">
                            <FallBackImage src='' fallback='MM' />
                            <article>
                                <Text title='নিজাম উদ্দিন' className='!text-md font-medium' />
                                <Text title='01542141414' variant='muted' />
                            </article>
                        </div>
                    </CardWithSideIndicator>

                    <CardWithSideIndicator active={true}>
                        <div className="flex items-center gap-space8">
                            <FallBackImage src='' fallback='MM' />
                            <article>
                                <Text title='নিজাম উদ্দিন' className='!text-md font-medium' />
                                <Text title='01542141414' variant='muted' />
                            </article>
                        </div>
                    </CardWithSideIndicator>
                </WrapperOddList>
            </div>

            <div className="p-space16 border-t border-primary-20 dark:border-primary-80">
                <Button className='w-full' >Add Customer</Button>
            </div>
        </Card>
    )
}
'use client'
import React, { useEffect } from 'react'
import Card from '@/components/common/Card'
import { Input } from '@/components/ui/input'
import CustomTab from '@/components/common/Tab'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/common/text'
import { useDueStore } from '@/stores/useDueStore'
import { ScrollArea } from '@/components/ui/scroll-area'
import { usePathname, useRouter } from 'next/navigation'
import FallBackImage from '@/components/common/FallBackImage'
import { IUserResponse } from '@/types/contact/partyResponse'
import WrapperOddList from '@/components/common/WrapperOddList'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'
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

export const LeftSection = ({ userList }: { userList: IUserResponse[] | undefined }) => {
    const handleDrawerOpen = useDueStore((state) => state.setDrawerState)

    const router = useRouter();
    const pathname = usePathname();
    const { getQueryString, setQueryString } = useCreateQueryString()

    const activeTab = getQueryString('tab') ?? '';
    const activeUser = getQueryString('active_user') ?? '';

    useEffect(() => {
        router.push(`${pathname}?${setQueryString('tab', activeTab ? activeTab : 'Customer')}`)
    }, [activeTab]);

    return (
        <Card className='h-full lg:w-4/12 flex flex-col gap-space16 lg:border-r border-color lg:rounded-tr-none'>
            <div className="space-y-space8 w-full">
                <CustomTab
                    data={tabData}
                    active={activeTab}
                    className='border-b w-full  px-space12 sm:px-space16 pt-space8'
                    handleChange={(item) => {
                        router.push(`${pathname}?${setQueryString('tab', item.value)}`)
                    }}
                />

                <Card className="grid grid-cols-2  px-space12 sm:px-space16">
                    <article className="border-r border-color text-center">
                        <Text title='You’ll Give' variant='secondary' className='text-sm font-medium' />
                        <Text title=' ৳ 10,000' className='font-semibold text-lg' variant='error' />
                    </article>
                    <article className=" text-center">
                        <Text title='You’ll Get' variant='secondary' className='text-sm font-medium' />
                        <Text title=' ৳ 10,000' className='font-semibold text-lg' variant='success' />
                    </article>
                </Card>

                <div className=" px-space12 sm:px-space16">
                    <Input placeholder="Search contact" />
                </div>
            </div>

            <ScrollArea className="h-[calc(100%-20.6rem)] overflow-y-scroll  px-space12 sm:px-space16">
                <WrapperOddList>
                    {userList?.map((item, index) => (
                        <CardWithSideIndicator
                            key={index}
                            active={item.id.toString() === activeUser}
                            onClick={() => router.push(`${pathname}?${setQueryString('active_user', item.id)}`)}
                        >
                            <div className="w-full flex items-center gap-space8">
                                <FallBackImage src={item.image_src ?? ''} fallback={item.name.charAt(0)} />

                                <div className="w-full flex items-center justify-between gap-space12">
                                    <article>
                                        <Text title={item?.name} className='!text-md font-medium' />
                                        <Text title={item?.mobile} variant='muted' />
                                    </article>

                                    <article>
                                        <Text title='+৳ 12,00' className='font-medium' variant='success' />
                                        <Text title='Taken' variant='white' className='text-xs bg-success-100 px-space12 py-[.2rem] rounded-full dark:!text-primary-100' />
                                    </article>
                                </div>
                            </div>
                        </CardWithSideIndicator>
                    ))}
                </WrapperOddList>
            </ScrollArea>

            <div className="p-space12 sm:p-space16 border-t border-primary-20 dark:border-primary-80">
                <Button
                    className='w-full'
                    onClick={() => handleDrawerOpen({ open: true, header: `Add ${activeTab}` })}
                >
                    Add {activeTab}
                </Button>
            </div>
        </Card>
    )
}
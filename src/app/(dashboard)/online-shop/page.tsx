'use client'
import Card from '@/components/common/Card'
import Icon from '@/components/common/Icon'
import { Text } from '@/components/common/text'
import { Button } from '@/components/ui/button'
import React from 'react'

const overview = [
    {
        title: 'Active order',
        value: '5'
    },
    {
        title: 'Processing',
        value: '5'
    },
    {
        title: 'Delivered',
        value: '5'
    },
    {
        title: 'Total Income',
        value: '5'
    },
    {
        title: 'Online Product',
        value: '5'
    },
]
const overviewOther = [
    {
        title: 'Online Message',
        value: '5'
    },
    {
        title: 'Order list',
        value: '5'
    },
    {
        title: 'Products',
        value: '5'
    },
]

const Overview = () => {
    return (
        <div className='w-full h-full flex flex-col gap-space16'>

            <div className="flex justify-end gap-space16">
                <Button variant={'transparent'} className='bg-primary-10' >
                    Copy shop Link
                    <Icon icon="ic:baseline-content-copy" />
                </Button>
                <Button variant={'transparent'} className='bg-primary-10' >
                    Visit online shop
                    <Icon icon="material-symbols:link" />
                </Button>
            </div>

            <div className="flex justify-center flex-wrap gap-space16">
                {overview.map(item => (
                    <Card key={item.title} className="w-full max-w-[14.4rem] h-[12rem] flex flex-col items-center justify-center gap-space8">
                        <Text title={item.title} variant='secondary' />
                        <Text title={item.value} className='font-bold text-xl' />
                    </Card>
                ))}
            </div>
            <div className="flex justify-center flex-wrap gap-space16">
                {overviewOther.map(item => (
                    <Card key={item.title} className="w-full max-w-[25rem] h-[12rem] flex flex-col items-center justify-center gap-space8">
                        <Text title={item.value} className='font-bold text-xl' />
                        <Text title={item.title} variant='secondary' />
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Overview
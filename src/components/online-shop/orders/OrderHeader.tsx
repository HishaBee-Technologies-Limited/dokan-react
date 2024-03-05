'use client'
import React from 'react'
import { SortIcon } from '@/components/common/icons'
import DatePicker from '@/components/common/DatePicker'
import { PageSubTitle } from '@/components/common/text'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'


const OrderHeader = () => {
    return (
        <div className='flex justify-between items-center gap-space12 flex-wrap'>
            <PageSubTitle title="Order List" />

            <div className="flex gap-space12">
                <DatePicker onChange={() => { }} />
                <Select onValueChange={() => { }} defaultValue={''}>
                    <SelectTrigger className="max-w-max gap-space8 border-color  h-[3.6rem]" >
                        <SortIcon />
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent align='end' >
                        <div className="max-h-[24rem] overflow-y-scroll">
                            <SelectItem value="m@example.com">m@example.com</SelectItem>
                            <SelectItem value="m@google.com">m@google.com</SelectItem>
                            <SelectItem value="m@support.com">m@support.com</SelectItem>
                        </div>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default OrderHeader
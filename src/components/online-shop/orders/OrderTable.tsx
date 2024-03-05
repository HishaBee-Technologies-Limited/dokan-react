'use client'
import React from 'react'
import { Text } from '@/components/common/text'
import { Image } from '@/components/common/Image'
import { useOnlineShopStore } from '@/stores/useOnlineShopStore'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const tableData = [
    { id: '113', type: 'new' },
    { id: '114', type: 'pending' },
    { id: '1154', type: 'complete' },
    { id: '116', type: 'cancelled' },
]

export const OrderTable = () => {
    const orderFilterTab = useOnlineShopStore(state => state.orderFilterTab)

    const dynamicVariant = (type: string): "blue" | "warning" | "success" | "error" | undefined => {
        if (type === 'new') {
            return 'blue'
        } else if (type === 'pending') {
            return 'warning'
        } else if (type === 'complete') {
            return 'success'
        } else if (type === 'cancelled') {
            return 'error'
        } else {
            return undefined
        }
    }
    const dynamicBG = (type: string) => {
        if (type === 'new') {
            return 'bg-blue-100'
        } else if (type === 'pending') {
            return 'bg-warning-10'
        } else if (type === 'complete') {
            return 'bg-success-20'
        } else if (type === 'cancelled') {
            return 'bg-error-10'
        } else {
            return undefined
        }
    }
    const dynamicText = (type: string) => {
        if (type === 'new') {
            return 'New Order'
        } else if (type === 'pending') {
            return 'Pending'
        } else if (type === 'complete') {
            return 'Complete'
        } else if (type === 'cancelled') {
            return 'Cancelled'
        } else {
            return undefined
        }
    }


    const filteringData = orderFilterTab === 'all' ? tableData : tableData.filter(item => item.type === orderFilterTab)

    return (
        <ScrollArea className="pb-space8">
            <Table wrapperClass='rounded-md border border-color'>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order Id</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>type</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filteringData.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{'#12546549'}</TableCell>
                            <TableCell>{'23 May 2023'}</TableCell>
                            <TableCell>{'Md. Ariful Islam'}</TableCell>
                            <TableCell>{'৳200'}</TableCell>
                            <TableCell>{'2 Items'}</TableCell>
                            <TableCell>
                                <Text
                                    title={dynamicText(row.type)}
                                    variant={dynamicVariant(row.type)}
                                    className={`text-xs font-medium rounded-md px-space8 py-space4 max-w-max ${dynamicBG(row.type)}`}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={6} className='text-center'>Showing 10 of 100 Transactions</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}
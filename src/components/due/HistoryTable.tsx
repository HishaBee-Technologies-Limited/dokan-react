'use client'
import React from 'react'
import { Text } from '@/components/common/text'
import FallBackImage from '@/components/common/FallBackImage'
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ScrollArea, ScrollBar } from '../ui/scroll-area'

const data = [
    {
        number: "01542101414",
        person: "Customer",
        amount: "৳200",
        type: "Taken",
        date: 'Dec 30, 09:42 PM',
    },
    {
        number: "01542149414",
        person: "Supplier",
        amount: "৳200",
        type: "Given",
        date: 'Dec 30, 09:42 PM',
    },
    {
        number: "01542741414",
        person: "Customer",
        amount: "৳200",
        type: "Taken",
        date: 'Dec 30, 09:42 PM',
    },
    {
        number: "01548141414",
        person: "Supplier",
        amount: "৳200",
        type: "Given",
        date: 'Dec 30, 09:42 PM',
    },
]

const HistoryTable = () => {

    return (
        <ScrollArea className="pb-space8">
            <Table wrapperClass='rounded-md border border-color min-w-[80rem]'>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Person</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className='text-center' >Date & Time</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map((item, i) => (
                        <TableRow key={item.number}>
                            <TableCell>
                                <div className="flex items-center gap-space8">
                                    <FallBackImage src='' fallback='MM' />

                                    <Text title={`আরিফুল ইসলাম`} className='text-sm' />
                                </div>
                            </TableCell>
                            <TableCell>{item.number}</TableCell>
                            <TableCell>{item.person}</TableCell>
                            <TableCell>{item.amount}</TableCell>
                            <TableCell className='text-center'>
                                <article className="flex items-center gap-space16 justify-center">
                                    <Text
                                        title={item.type}
                                        className={`!text-white dark:!text-white max-w-max px-space12 py-space4 rounded-full text-sm uppercase dark:bg-primary-80 ${item.type === 'Given' ? 'bg-error-100' : 'bg-success-100'}`}
                                    />
                                    {item.date}
                                </article>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={5} className='text-center'>Showing 10 of 100 Transactions</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <ScrollBar orientation="horizontal" />
        </ScrollArea >
    )
}

export default HistoryTable
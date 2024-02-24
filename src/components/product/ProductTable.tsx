'use client'
import React from 'react'
import { Text } from '@/components/common/text'
import { Image } from '@/components/common/Image'
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const ProductTable = () => {

    return (
        <div className="pb-space16 w-full relative overflow-x-scroll">
            <div className="rounded-md border border-color min-w-[80rem]">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Product name</TableHead>
                            <TableHead>Current stock</TableHead>
                            <TableHead>Unit Price</TableHead>
                            <TableHead>total stock price</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {Array(10).fill(0).map((item, i) => (
                            <TableRow key={item.number}>
                                <TableCell>
                                    <div className="flex items-center gap-space8">
                                        <Image src='' alt='' height={40} width={40} />

                                        <Text title={`Nestle Nescafe Classic Instant Coffee Pouch Pack`} className='text-sm' />
                                    </div>
                                </TableCell>
                                <TableCell>51</TableCell>
                                <TableCell>৳ 200</TableCell>
                                <TableCell>৳ 200989</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={5} className='text-center'>Showing 10 of 100 Transactions</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div >
    )
}

export default ProductTable
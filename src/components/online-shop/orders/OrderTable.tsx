import React from 'react'
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
import { getOrders } from "@/actions/shop/orders";
import { OrdersTableHeader } from "@/config/orders";

const tableData = [
    { id: '113', type: 'new' },
    { id: '114', type: 'pending' },
    { id: '1154', type: 'complete' },
    { id: '116', type: 'cancelled' },
]

export const OrderTable = async () => {
    // const orderFilterTab = useOnlineShopStore(state => state.orderFilterTab)
    // const filteringData = orderFilterTab === 'all' ? tableData : tableData.filter(item => item.type === orderFilterTab)

    const orders = await getOrders({ activeTab: 'new'})
    console.log(orders?.data)

    return (
        <ScrollArea className="pb-space8">
            <Table wrapperClass='rounded-md border border-color'>
                <TableHeader>
                    <TableRow>
                        { OrdersTableHeader.map((item)=> <TableHead key={item.id}>{item.label}</TableHead>)}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {/*{filteringData.map((row) => (*/}
                    {/*    <TableRow key={row.id}>*/}
                    {/*        <TableCell>{'#12546549'}</TableCell>*/}
                    {/*        <TableCell>{'23 May 2023'}</TableCell>*/}
                    {/*        <TableCell>{'Md. Ariful Islam'}</TableCell>*/}
                    {/*        <TableCell>{'৳200'}</TableCell>*/}
                    {/*        <TableCell>{'2 Items'}</TableCell>*/}
                    {/*        <TableCell>*/}
                    {/*            <Text*/}
                    {/*                title={orderTypeWiseStyled(row.type).title()}*/}
                    {/*                variant={orderTypeWiseStyled(row.type).textVariant()}*/}
                    {/*                className={`text-xs font-medium rounded-md px-space8 py-space4 max-w-max */}
                    {/*                ${orderTypeWiseStyled(row.type).textBackground()}`}*/}
                    {/*            />*/}
                    {/*        </TableCell>*/}
                    {/*    </TableRow>*/}
                    {/*))}*/}
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
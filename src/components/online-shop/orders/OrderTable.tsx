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
import { DeliveryStatusDef } from "@/types/orders";
import { formatDate } from "@/lib/date";
import { Text } from "@/components/common/text";
import { orderTypeWiseStyled } from "@/components/online-shop/orders/orderTypeWiseStyled";

type OrderTablePropsDef = {
    activeTab: DeliveryStatusDef | undefined
}

export const OrderTable = async ({activeTab}: OrderTablePropsDef) => {
    const ordersResponse = await getOrders({ activeTab: activeTab ? activeTab : 'new' })

    return (
        <ScrollArea className="pb-space8">
            <Table wrapperClass='rounded-md border border-color'>
                <TableHeader>
                    <TableRow>
                        { OrdersTableHeader.map((item)=> <TableHead key={item.id}>{item.label}</TableHead>)}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    { ordersResponse?.data?.data?.data?.map((item)=> (
                      <TableRow key={item.id}>
                          <TableCell>{item.code}</TableCell>
                          <TableCell>{formatDate(item.created_at)}</TableCell>
                          <TableCell>{JSON.parse(item.shipping_address)?.mobile_number ?? 'N/A'}</TableCell>
                          <TableCell>৳{item.grand_total}</TableCell>
                          <TableCell>{item.order_details?.length ?? 'N/A'}</TableCell>
                          <TableCell>
                              <Text
                                title={orderTypeWiseStyled(item.order_details[0]?.delivery_status).title()}
                                variant={orderTypeWiseStyled(item.order_details[0]?.delivery_status).textVariant()}
                                className={`text-xs font-medium rounded-md px-space8 py-space4 max-w-max 
                                    ${orderTypeWiseStyled(item.order_details[0]?.delivery_status).textBackground()}`}
                              />
                          </TableCell>
                      </TableRow>
                    ))}
                </TableBody>

                <TableFooter>
                    <TableRow>
                        {/*<TableCell colSpan={6} className='text-center'>Showing 10 of 100 Transactions</TableCell>*/}
                    </TableRow>
                </TableFooter>
            </Table>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}
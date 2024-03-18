import React from 'react'
import { PageSubTitle } from '@/components/common/text'
import { DatePickerWithRange } from "@/components/common/DatePickerWithRange";
import { getOrders } from "@/actions/shop/orders";


const OrderHeader = async () => {


    const orders = await getOrders({ activeTab: 'new'})
    console.log({orders})
    return (
        <div className='flex justify-between items-center gap-space12 flex-wrap'>
            <PageSubTitle title="Order List" />

            <div className="flex gap-space12">
                <DatePickerWithRange />
                {/*<OrderListSorting />*/} {/* TODO: order list sorting coming soon */}
            </div>
        </div>
    )
}

export default OrderHeader
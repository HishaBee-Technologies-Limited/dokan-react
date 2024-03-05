import React from 'react'
import OrderHeader from '@/components/online-shop/orders/OrderHeader'
import FilteringTabs from '@/components/online-shop/orders/FilteringTabs'
import { OrderTable } from '@/components/online-shop/orders/OrderTable'

const OrderPage = () => {
    return (
        <div className='w-full space-y-space16'>
            <OrderHeader />
            <FilteringTabs />
            <OrderTable />
        </div>
    )
}

export default OrderPage
import React from 'react'
import OrderHeader from '@/components/online-shop/orders/OrderHeader'
import FilteringTabs from '@/components/online-shop/orders/FilteringTabs'
import { OrderTable } from '@/components/online-shop/orders/OrderTable'
import { IDeliveryStatusType } from "@/types/orders";

type IOrderPageTYpe = {
  searchParams: {
    activeTab: IDeliveryStatusType | undefined
  }
}

const OrderPage = ({ searchParams}: IOrderPageTYpe) => {
    return (
        <div className='w-full space-y-space16'>
            <OrderHeader />
            <FilteringTabs />
            <OrderTable activeTab={searchParams.activeTab} />
        </div>
    )
}

export default OrderPage
import React from 'react'
import { PageSubTitle } from '@/components/common/text'
import OrderDateRangePicker from "@/components/online-shop/orders/OrderDateRangePicker";

const OrderHeader = () => (
  <div className='flex justify-between items-center gap-space12 flex-wrap'>
    <PageSubTitle title="Order List" />

    <div className="flex gap-space12">
      <OrderDateRangePicker />
      {/*<OrderListSorting />*/} {/* TODO: order list sorting coming soon */}
    </div>
  </div>
)

export default OrderHeader
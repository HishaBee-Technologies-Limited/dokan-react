import React from 'react';
import { PageSubTitle } from '@/components/common/text';
import OrderDateRangePicker from '@/components/online-shop/orders/OrderDateRangePicker';
import OrderListSorting from '@/components/online-shop/orders/OrderListSorting';

const OrderHeader = () => (
  <div className="flex justify-between items-center gap-space12 flex-wrap">
    <PageSubTitle title="Order List" />

    <div className="flex gap-space12">
      <OrderDateRangePicker />
      <OrderListSorting />
    </div>
  </div>
);

export default OrderHeader;

import React from 'react';
import OrderHeader from '@/components/online-shop/orders/OrderHeader';
import FilteringTabs from '@/components/online-shop/orders/FilteringTabs';
import { OrderTable } from '@/components/online-shop/orders/OrderTable';
import { QueryParamsDef } from '@/types/orders';

type OrderPagePropsDef = {
  searchParams: QueryParamsDef;
};

const OrderPage = ({ searchParams }: OrderPagePropsDef) => {
  return (
    <div className="w-full space-y-space16">
      <OrderHeader />
      <FilteringTabs />
      <OrderTable params={searchParams} />
    </div>
  );
};

export default OrderPage;

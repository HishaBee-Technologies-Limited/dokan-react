import React from 'react';
import { PageSubTitle } from '@/components/common/text';
import DetailsActions from '@/components/online-shop/orders/DetailsActions';
import DetailsInformation from '@/components/online-shop/orders/DetailsInformation';
import { ProductSummeryTable } from '@/components/online-shop/orders/ProductSummeryTable';

const OrderDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="space-y-space16 w-full pr-space8">
      <PageSubTitle title="Order Details" />

      <DetailsInformation id={params.id} />

      <ProductSummeryTable />

      <DetailsActions />
    </div>
  );
};

export default OrderDetailsPage;

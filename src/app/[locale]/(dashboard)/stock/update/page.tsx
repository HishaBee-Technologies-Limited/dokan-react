import React from 'react';
import { PageTitle } from '@/components/common/text';
import UpdateStockTable from '@/components/stock/UpdateStockTable';
import { getShopsProducts } from '@/actions/product/getShopProducts';
import { QueryParamsDef } from '@/types/product';
import { StockQueries } from '@/components/stock/StockQueries';

type ProductPagePropsDef = {
  searchParams: QueryParamsDef & {
    product?: string;
  };
};

const UpdateStock = async ({ searchParams }: ProductPagePropsDef) => {
  const allProductsResponse = await getShopsProducts({ params: searchParams });

  return (
    <div className="space-y-space16">
      <PageTitle title="Update stock quantity" />

      <UpdateStockTable products={allProductsResponse?.data} />
    </div>
  );
};

export default UpdateStock;

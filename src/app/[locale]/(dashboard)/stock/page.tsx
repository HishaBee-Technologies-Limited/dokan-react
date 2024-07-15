import React from 'react';
import { StockTable } from '@/components/stock/StockTable';
import { StockHeader } from '@/components/stock/StockHeader';
import { StockQueries } from '@/components/stock/StockQueries';
import { ProductDrawers } from '@/components/product/drawers';
import { ProductDialogs } from '@/components/product/dialogs';
import { getShopsProducts } from '@/actions/product/getShopProducts';
import { QueryParamsDef } from '@/types/product';

type ProductPagePropsDef = {
  searchParams: QueryParamsDef & {
    product?: string;
  };
};
const StockManagement = async ({ searchParams }: ProductPagePropsDef) => {
  const allProductsResponse = await getShopsProducts({ params: searchParams });

  console.log(allProductsResponse);

  return (
    <>
      <div className="space-y-space24">
        <StockHeader />
        <StockQueries />
        <StockTable products={allProductsResponse?.data} />
      </div>

      {/* <ProductDrawers />
            <ProductDialogs /> */}
    </>
  );
};

export default StockManagement;

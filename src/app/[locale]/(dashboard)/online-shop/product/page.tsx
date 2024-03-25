import React from 'react';
import { ProductDialogs } from '@/components/online-shop/product/dialogs';
import { ProductDrawers } from '@/components/online-shop/product/drawers';
import { ProductTable } from '@/components/online-shop/product/ProductTable';
import { ProductHeader } from '@/components/online-shop/product/ProductHeader';
import { ProductQueries } from '@/components/online-shop/product/ProductQueries';

const ProductPage = () => {
  return (
    <>
      <div className="space-y-space16">
        <ProductHeader />
        <ProductQueries />
        <ProductTable />
      </div>

      <ProductDrawers />
      <ProductDialogs />
    </>
  );
};

export default ProductPage;

import React from 'react';
import { StockTable } from '@/components/stock/StockTable';
import { StockHeader } from '@/components/stock/StockHeader';
import { StockQueries } from '@/components/stock/StockQueries';
import { ProductDrawers } from '@/components/product/drawers';
import { ProductDialogs } from '@/components/product/dialogs';

const StockManagement = () => {
  return (
    <>
      <div className="space-y-space24">
        <StockHeader />
        <StockQueries />
        <StockTable />
      </div>

      {/* <ProductDrawers />
            <ProductDialogs /> */}
    </>
  );
};

export default StockManagement;

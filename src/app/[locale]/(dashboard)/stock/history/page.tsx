import React from 'react';
import HistoryTable from '@/components/stock/HistoryTable';
import HistoryHeader from '@/components/stock/HistoryHeader';
import { getStockHistory } from '@/actions/stock/getStockHistory';

const HistoryPage = async () => {
  const responseOfStock = await getStockHistory();
  return (
    <div className="space-y-space16">
      <HistoryHeader />

      <HistoryTable stocks={responseOfStock?.data} />
    </div>
  );
};

export default HistoryPage;

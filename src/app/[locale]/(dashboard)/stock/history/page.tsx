import React from 'react';
import HistoryTable from '@/components/stock/HistoryTable';
import HistoryHeader from '@/components/stock/HistoryHeader';

const HistoryPage = () => {
  return (
    <div className="space-y-space16">
      <HistoryHeader />

      <HistoryTable />
    </div>
  );
};

export default HistoryPage;

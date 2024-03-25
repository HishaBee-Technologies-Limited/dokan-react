import React from 'react';
import SellDrawers from '@/components/sell/drawers';
import SellDialogs from '@/components/sell/dialogs';
import HistoryTable from '@/components/sell/history/HistoryTable';
import HistoryHeader from '@/components/sell/history/HistoryHeader';

const SellHistory = () => {
  return (
    <>
      <div className="space-y-space16 h-full w-full">
        <HistoryHeader />
        <HistoryTable />
      </div>

      <SellDrawers />
      <SellDialogs />
    </>
  );
};

export default SellHistory;

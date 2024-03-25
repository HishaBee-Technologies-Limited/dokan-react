import React from 'react';
import PurchaseDialogs from '@/components/purchase/dialogs';
import PurchaseDrawers from '@/components/purchase/drawers';
import HistoryTable from '@/components/purchase/history/HistoryTable';
import HistoryHeader from '@/components/purchase/history/HistoryHeader';

const PurchaseHistory = () => {
  return (
    <>
      <div className="space-y-space16 h-full w-full">
        <HistoryHeader />
        <HistoryTable />
      </div>

      <PurchaseDrawers />
      <PurchaseDialogs />
    </>
  );
};

export default PurchaseHistory;

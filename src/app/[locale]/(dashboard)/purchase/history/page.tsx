import React from 'react';
import PurchaseDialogs from '@/components/purchase/dialogs';
import PurchaseDrawers from '@/components/purchase/drawers';
import HistoryTable from '@/components/purchase/history/HistoryTable';
import HistoryHeader from '@/components/purchase/history/HistoryHeader';
import { getPurchaseHistory } from '@/actions/purchase/getPurchaseHistory';
import { IPurchaseHistoryResponse } from '@/types/purchase';
import { ICommonGetResponse } from '@/types/common';

const PurchaseHistory = async ({ searchParams }: any) => {
  console.log(searchParams);
  const purchaseHistory = await getPurchaseHistory(
    Number(searchParams.page),
    searchParams.start_date,
    searchParams.end_date
  );
  return (
    <>
      <div className="space-y-space16 h-full w-full">
        <HistoryHeader />
        <HistoryTable purchaseHistory={purchaseHistory?.data as any} />
      </div>

      <PurchaseDrawers />
      <PurchaseDialogs />
    </>
  );
};

export default PurchaseHistory;

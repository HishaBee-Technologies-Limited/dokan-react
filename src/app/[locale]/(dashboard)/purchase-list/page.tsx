import React from 'react';
import PurchaseDialogs from '@/components/purchase/dialogs';
import PurchaseDrawers from '@/components/purchase/drawers';
import HistoryTable from '@/components/purchase/history/HistoryTable';
import HistoryHeader from '@/components/purchase/history/HistoryHeader';
import { getPurchaseHistory } from '@/actions/purchase/getPurchaseHistory';

import { cookies } from 'next/headers';
import { getAllSupplier } from '@/actions/contacts/getAllSupplier';
import { IUserResponse } from '@/types/contact/partyResponse';

const PurchaseHistory = async ({ searchParams }: any) => {
  const purchaseHistory = await getPurchaseHistory(
    Number(searchParams.page),
    searchParams.start_date,
    searchParams.end_date
  );
  const shopId = cookies().get('shopId')?.value;
  const allSupplier = await getAllSupplier(Number(shopId));

  return (
    <>
      <div className="space-y-space16 h-full w-full">
        <HistoryHeader />
        <HistoryTable purchaseHistory={purchaseHistory?.data as any} />
      </div>

      <PurchaseDrawers suppliers={allSupplier?.data as IUserResponse[]} />
      <PurchaseDialogs />
    </>
  );
};

export default PurchaseHistory;

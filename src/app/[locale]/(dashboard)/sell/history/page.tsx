import React from 'react';
import SellDrawers from '@/components/sell/drawers';
import SellDialogs from '@/components/sell/dialogs';
import HistoryTable from '@/components/sell/history/HistoryTable';
import HistoryHeader from '@/components/sell/history/HistoryHeader';
import { getAllCustomer } from '@/actions/contacts/getAllCustomer';
import { cookies } from 'next/headers';
import { IUserResponse } from '@/types/contact/partyResponse';
import { getSellHistory } from '@/actions/sell/getSellHistory';

const SellHistory = async ({ searchParams }: any) => {
  const transactions = await getSellHistory(
    Number(searchParams.page),
    searchParams.start_date,
    searchParams.end_date
  );
  console.log(transactions);
  const shopId = cookies().get('shopId')?.value;
  const customers = await getAllCustomer(Number(shopId));
  return (
    <>
      <div className="space-y-space16 h-full w-full">
        <HistoryHeader />
        <HistoryTable transactions={transactions?.data as any} />
      </div>

      <SellDrawers customers={customers?.data as IUserResponse[]} />
      <SellDialogs />
    </>
  );
};

export default SellHistory;

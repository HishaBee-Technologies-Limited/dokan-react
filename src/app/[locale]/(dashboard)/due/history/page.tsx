import React from 'react';
import { format } from 'date-fns';
import HistoryTable from '@/components/due/HistoryTable';
import HistoryHeader from '@/components/due/HistoryHeader';
import HistoryReport from '@/components/due/HistoryReport';
import { IDueItemsResponse } from '@/types/due/dueResponse';
import { getAllDueHistory } from '@/actions/due/getAllDueHistory';

interface IDueHistoryProps {
  params: { locale: string };
  searchParams: any;
}

const DueHistory = async ({
  params: { locale },
  searchParams,
}: IDueHistoryProps) => {
  const end_date = searchParams.end_date?.split('-')[0] ?? new Date();
  const start_date = searchParams.start_date?.split('-')[0] ?? new Date();

  const params = {
    // page: 1,
    end_date: format(end_date, 'yyyy-MM-dd HH:mm:ss'),
    start_date: format(start_date, 'yyyy-MM-dd HH:mm:ss'),
  };

  const dueList = await getAllDueHistory(params);

  return (
    <div className="space-y-space16 h-full w-full">
      <HistoryHeader />
      <HistoryReport totalValues={dueList?.metadata} />
      <HistoryTable dueList={dueList?.data as IDueItemsResponse[]} />
    </div>
  );
};

export default DueHistory;

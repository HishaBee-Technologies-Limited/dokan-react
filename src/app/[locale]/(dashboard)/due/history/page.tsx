import React from 'react'
import HistoryTable from '@/components/due/HistoryTable'
import HistoryHeader from '@/components/due/HistoryHeader'
import HistoryReport from '@/components/due/HistoryReport'
import { getAllDueHistory } from '@/actions/due/getAllDueHistory'
import { IDueItemsResponse } from '@/types/due/dueResponse'

interface IDueHistoryProps {
    params: { locale: string };
    searchParams: any;
};

const DueHistory = async ({
    params: { locale },
    searchParams,
}: IDueHistoryProps) => {

    const params = {
        // page: 1,
        start_date: '2022-01-01 12:12:12',
        end_date: '2022-06-01 12:12:12'
    }

    const dueList = await getAllDueHistory(params);

    return (
        <div className='space-y-space16 h-full w-full'>
            <HistoryHeader />
            <HistoryReport totalValues={dueList?.metadata} />
            <HistoryTable dueList={dueList?.data as IDueItemsResponse[]} />
        </div>
    )
}

export default DueHistory
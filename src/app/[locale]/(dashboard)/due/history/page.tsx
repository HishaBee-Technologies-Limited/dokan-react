import React from 'react'
import HistoryTable from '../../../../../components/due/HistoryTable'
import HistoryHeader from '../../../../../components/due/HistoryHeader'
import HistoryReport from '../../../../../components/due/HistoryReport'

const SellHistory = () => {
    return (
        <div className='space-y-space16 h-full w-full'>
            <HistoryHeader />
            <HistoryReport />
            <HistoryTable />
        </div>
    )
}

export default SellHistory
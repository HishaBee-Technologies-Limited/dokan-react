import React from 'react'
import { StockTable } from '@/components/stock/StockTable'
import { StockHeader } from '@/components/stock/StockHeader'
import { StockQueries } from '@/components/stock/StockQueries'

const StockManagement = () => {
    return (
        <div className='space-y-space24'>
            <StockHeader />
            <StockQueries />
            <StockTable />
        </div>
    )
}

export default StockManagement
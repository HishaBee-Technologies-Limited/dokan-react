import React from 'react'
import { PageTitle } from '@/components/common/text'
import UpdateStockTable from '@/components/product/UpdateStockTable'

const UpdateStock = () => {
    return (
        <div className='space-y-space16'>
            <PageTitle title="Update stock quantity" />

            <UpdateStockTable />
        </div>
    )
}

export default UpdateStock
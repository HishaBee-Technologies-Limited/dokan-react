import React from 'react'
import { ProductDialogs } from '../../../../components/product/dialogs'
import { ProductDrawers } from '../../../../components/product/drawers'
import { ProductTable } from '../../../../components/product/ProductTable'
import { ProductHeader } from '../../../../components/product/ProductHeader'
import { ProductQueries } from '../../../../components/product/ProductQueries'

const ProductPage = () => {
    return (
        <>
            <div className='space-y-space16'>
                <ProductHeader />
                <ProductQueries />
                <ProductTable />
            </div>

            <ProductDrawers />
            <ProductDialogs />
        </>
    )
}

export default ProductPage
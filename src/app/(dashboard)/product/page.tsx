import React from 'react'
import ProductTable from '@/components/product/ProductTable'
import ProductHeader from '@/components/product/ProductHeader'
import { ProductQueries } from '@/components/product/ProductQueries'

const ProductList = () => {
    return (
        <div className='space-y-space24'>
            <ProductHeader />
            <ProductQueries />
            <ProductTable />
        </div>
    )
}

export default ProductList
import React from 'react'
import PurchaseDialogs from '../../../../components/purchase/dialogs'
import PurchaseDrawers from '../../../../components/purchase/drawers'
import { LeftSection } from '../../../../components/purchase/LeftSection'
import { RightSection } from '../../../../components/purchase/RightSection'
import PurchaseHeader from '../../../../components/purchase/PurchaseHeader'

const PurchasePage = () => {
    return (
        <>
            <div className='space-y-space16 h-full'>
                <PurchaseHeader />

                <div className='space-y-space16 lg:space-y-0 lg:flex items-center h-[calc(100%-6.4rem)]'>
                    <LeftSection />
                    <RightSection />
                </div>
            </div>

            <PurchaseDrawers />
            <PurchaseDialogs />
        </>
    )
}

export default PurchasePage
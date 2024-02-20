'use client'

import React from 'react'
import { SellEnum } from '@/enum/sell'
import { Drawer } from '@/components/common/Drawer'
import { useSellStore } from '@/stores/useSellStore'
import QuickSell from '@/components/sell/drawers/QuickSell'
import ConfirmPayment from '@/components/sell/drawers/ConfirmPayment'
import MoneyGiveReceived from '@/components/sell/drawers/MoneyGiveReceived'

const SellDrawers = () => {
    const drawerState = useSellStore((state) => state.sellDrawerState)
    const handleClose = useSellStore((state) => state.setSellDrawerState)

    const renderedDrawers = (activeDrawer: string | undefined) => {
        if (SellEnum.QUICK_SELL === activeDrawer) {
            return <QuickSell />
        } else if (SellEnum.CONFIRM_PAYMENT === activeDrawer) {
            return <ConfirmPayment />
        } else if (SellEnum.MONEY_GIVEN_ENTRY || SellEnum.MONEY_RECEIVED_ENTRY === activeDrawer) {
            return <MoneyGiveReceived />
        }
    }

    return (
        <Drawer
            open={drawerState.open}
            header={drawerState.header}
            onClose={(open) => handleClose({ open })}
        >
            {renderedDrawers(drawerState.header)}
        </Drawer>
    )
}

export default SellDrawers
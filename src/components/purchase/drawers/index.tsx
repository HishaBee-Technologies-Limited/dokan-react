'use client';

import React from 'react';
import { SellEnum } from '@/enum/sell';
import { Drawer } from '@/components/common/Drawer';
import { usePurchaseStore } from '@/stores/usePurchase';
import ConfirmPayment from '@/components/purchase/drawers/ConfirmPayment';
import TransactionEdit from '@/components/purchase/drawers/TransactionEdit';
import MoneyGiveReceived from '@/components/purchase/drawers/MoneyGiveReceived';
import TransactionDetails from '@/components/purchase/drawers/TransactionDetails';

const PurchaseDrawers = () => {
  const drawerState = usePurchaseStore((state) => state.drawerState);
  const handleClose = usePurchaseStore((state) => state.setDrawerState);

  const renderedDrawers = (activeDrawer: string | undefined) => {
    if (SellEnum.CONFIRM_PAYMENT === activeDrawer) {
      return <ConfirmPayment />;
    } else if (SellEnum.MONEY_GIVEN_ENTRY === activeDrawer) {
      return <MoneyGiveReceived />;
    } else if (SellEnum.MONEY_RECEIVED_ENTRY === activeDrawer) {
      return <MoneyGiveReceived />;
    } else if (SellEnum.TRANSACTION_DETAILS === activeDrawer) {
      return <TransactionDetails />;
    } else if (SellEnum.TRANSACTION_EDIT === activeDrawer) {
      return <TransactionEdit />;
    }
  };

  return (
    <Drawer
      open={drawerState.open}
      header={drawerState.header}
      onClose={(open) => handleClose({ open })}
    >
      {renderedDrawers(drawerState.header)}
    </Drawer>
  );
};

export default PurchaseDrawers;

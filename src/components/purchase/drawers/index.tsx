'use client';

import React from 'react';
import { SellEnum } from '@/enum/sell';
import { Drawer } from '@/components/common/Drawer';
import { usePurchaseStore } from '@/stores/usePurchase';
import ConfirmPayment from '@/components/purchase/drawers/ConfirmPayment';
import TransactionEdit from '@/components/purchase/drawers/TransactionEdit';
import MoneyGiveReceived from '@/components/purchase/drawers/MoneyGiveReceived';
import TransactionDetails from '@/components/purchase/drawers/TransactionDetails';
import { PurchaseEnum } from '@/enum/purchase';
import { IUserResponse } from '@/types/contact/partyResponse';

const PurchaseDrawers = ({ suppliers }: { suppliers: IUserResponse[] }) => {
  const drawerState = usePurchaseStore((state) => state.drawerState);
  const handleClose = usePurchaseStore((state) => state.setDrawerState);

  const renderedDrawers = (activeDrawer: string | undefined) => {
    if (PurchaseEnum.CONFIRM_PAYMENT === activeDrawer) {
      return <ConfirmPayment />;
    } else if (PurchaseEnum.MONEY_GIVEN_ENTRY === activeDrawer) {
      return <MoneyGiveReceived suppliers={suppliers} />;
    } else if (PurchaseEnum.MONEY_RECEIVED_ENTRY === activeDrawer) {
      return <MoneyGiveReceived suppliers={suppliers} />;
    } else if (PurchaseEnum.TRANSACTION_DETAILS === activeDrawer) {
      return <TransactionDetails />;
    } else if (PurchaseEnum.TRANSACTION_EDIT === activeDrawer) {
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

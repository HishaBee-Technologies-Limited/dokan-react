'use client';

import React from 'react';
import { DueEnum } from '@/enum/due';
import { ContactEnum } from '@/enum/contact';
import { useDueStore } from '@/stores/useDueStore';
import { Drawer } from '@/components/common/Drawer';
import AddNewUser from '@/components/contact/drawers/AddNewUser';
import MoneyGiveReceived from '@/components/due/drawers/MoneyGiveReceived';
import AddMoneyGiveReceived from '@/components/due/drawers/AddMoneyGiveReceived';

const DueDrawers = () => {
  const drawerState = useDueStore((state) => state.drawerState);
  const handleClose = useDueStore((state) => state.setDrawerState);

  const renderedDrawers = (activeDrawer: string | undefined) => {
    if (DueEnum.ADD_MONEY_GIVEN_ENTRY === activeDrawer) {
      return <AddMoneyGiveReceived />;
    } else if (DueEnum.ADD_MONEY_RECEIVED_ENTRY === activeDrawer) {
      return <AddMoneyGiveReceived />;
    } else if (DueEnum.MONEY_GIVEN_ENTRY === activeDrawer) {
      return <MoneyGiveReceived />;
    } else if (DueEnum.MONEY_RECEIVED_ENTRY === activeDrawer) {
      return <MoneyGiveReceived />;
    } else if (
      ContactEnum.ADD_CUSTOMER === activeDrawer ||
      ContactEnum.ADD_SUPPLIER === activeDrawer ||
      ContactEnum.ADD_EMPLOYEE === activeDrawer
    ) {
      return <AddNewUser />;
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

export default DueDrawers;

"use client";

import React from "react";
import { DueEnum } from "../../../enum/due";
import { ContactEnum } from "../../../enum/contact";
import { useDueStore } from "../../../stores/useDueStore";
import { Drawer } from "../../common/Drawer";
import AddCustomer from "../../contact/drawers/AddCustomer";
import AddSupplier from "../../contact/drawers/AddSupplier";
import AddEmployee from "../../contact/drawers/AddEmployee";
import MoneyGiveReceived from "./MoneyGiveReceived";
import AddMoneyGiveReceived from "./AddMoneyGiveReceived";

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
    } else if (ContactEnum.ADD_CUSTOMER === activeDrawer) {
      return <AddCustomer />;
    } else if (ContactEnum.ADD_SUPPLIER === activeDrawer) {
      return <AddSupplier />;
    } else if (ContactEnum.ADD_EMPLOYEE === activeDrawer) {
      return <AddEmployee />;
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

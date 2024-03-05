"use client";

import React from "react";
import { ContactEnum } from "../../../enum/contact";
import { Drawer } from "../../common/Drawer";
import { useContactStore } from "../../../stores/useContactStore";
import AddCustomer from "./AddCustomer";
import AddSupplier from "./AddSupplier";
import AddEmployee from "./AddEmployee";
import AddNewMember from "./AddNewMember";

const ContactDrawers = () => {
  const drawerState = useContactStore((state) => state.contactDrawerState);
  const handleClose = useContactStore((state) => state.setContactDrawerState);

  const renderedDrawers = (activeDrawer: string | undefined) => {
    if (ContactEnum.ADD_NEW_MEMBER === activeDrawer) {
      return <AddNewMember />;
    } else if (
      ContactEnum.ADD_CUSTOMER === activeDrawer ||
      ContactEnum.EDIT_CUSTOMER === activeDrawer
    ) {
      return <AddCustomer />;
    } else if (
      ContactEnum.ADD_SUPPLIER === activeDrawer ||
      ContactEnum.EDIT_SUPPLIER === activeDrawer
    ) {
      return <AddSupplier />;
    } else if (
      ContactEnum.ADD_EMPLOYEE === activeDrawer ||
      ContactEnum.EDIT_EMPLOYEE === activeDrawer
    ) {
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

export default ContactDrawers;

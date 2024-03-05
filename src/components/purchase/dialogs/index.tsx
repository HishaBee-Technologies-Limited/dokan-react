"use client";

import React from "react";
import { SellEnum } from "../../../enum/sell";
import { Dialog } from "../../common/Dialog";
import { usePurchaseStore } from "../../../stores/usePurchase";
import QRCode from "./QRCode";
import Successful from "./Successful";
import TransactionDelete from "./TransactionDelete";

const PurchaseDialogs = () => {
  const dialogState = usePurchaseStore((state) => state.dialogState);
  const handleClose = usePurchaseStore((state) => state.setDialogState);

  const renderedDrawers = (activeDialog: string | undefined) => {
    if (SellEnum.QR_CODE === activeDialog) {
      return <QRCode />;
    } else if (SellEnum.SUCCESSFUL === activeDialog) {
      return <Successful />;
    } else if (SellEnum.TRANSACTION_DELETE === activeDialog) {
      return <TransactionDelete />;
    }
  };

  return (
    <Dialog
      open={dialogState.open}
      header={dialogState.header}
      onClose={(open) => handleClose({ open })}
    >
      {renderedDrawers(dialogState.header)}
    </Dialog>
  );
};

export default PurchaseDialogs;

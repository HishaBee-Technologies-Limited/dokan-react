'use client';

import React from 'react';
import { Dialog } from '@/components/common/Dialog';
import { usePurchaseStore } from '@/stores/usePurchase';
import QRCode from '@/components/purchase/dialogs/QRCode';
import Successful from '@/components/purchase/dialogs/Successful';
import TransactionDelete from '@/components/purchase/dialogs/TransactionDelete';
import { PurchaseEnum } from '@/enum/purchase';
import { usePurchase } from '@/stores/usePurchaseStore';

const PurchaseDialogs = () => {
  const dialogState = usePurchaseStore((state) => state.dialogState);
  const handleClose = usePurchaseStore((state) => state.setDialogState);
  const clearProductArray = usePurchase((state) => state.setProducts);

  const renderedDrawers = (activeDialog: string | undefined) => {
    if (PurchaseEnum.QR_CODE === activeDialog) {
      return <QRCode />;
    } else if (PurchaseEnum.SUCCESSFUL === activeDialog) {
      return <Successful />;
    } else if (PurchaseEnum.TRANSACTION_DELETE === activeDialog) {
      return <TransactionDelete />;
    }
  };

  return (
    <Dialog
      open={dialogState.open}
      header={dialogState.header}
      onClose={(open) => {
        handleClose({ open });
        clearProductArray([]);
      }}
    >
      {renderedDrawers(dialogState.header)}
    </Dialog>
  );
};

export default PurchaseDialogs;

'use client';

import React from 'react';
import { SellEnum } from '@/enum/sell';
import { Dialog } from '@/components/common/Dialog';
import { useSellStore } from '@/stores/useSellStore';
import QRCode from '@/components/sell/dialogs/QRCode';
import Successful from '@/components/sell/dialogs/Successful';
import TransactionDelete from '@/components/sell/dialogs/TransactionDelete';

const SellDialogs = () => {
  const dialogState = useSellStore((state) => state.sellDialogState);
  const handleClose = useSellStore((state) => state.setSellDialogState);

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

export default SellDialogs;

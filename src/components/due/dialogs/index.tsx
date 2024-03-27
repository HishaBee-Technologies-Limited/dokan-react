'use client';

import React from 'react';
import { DueEnum } from '@/enum/due';
import { useDueStore } from '@/stores/useDueStore';
import { Dialog } from '@/components/common/Dialog';
import DueReminder from '@/components/due/dialogs/DueReminder';
import SelectDueType from '@/components/due/dialogs/SelectDueType';
import SelectTheDueType from '@/components/due/dialogs/SelectTheDueType';

const DueDialogs = () => {
  const dialogState = useDueStore((state) => state.dialogState);
  const handleClose = useDueStore((state) => state.setDialogState);

  const renderedDrawers = (activeDialog: string | undefined) => {
    if (DueEnum.SELECT_THE_DUE_TYPE === activeDialog) {
      return <SelectTheDueType />;
    } else if (DueEnum.DUE_REMINDER === activeDialog) {
      return <DueReminder />;
    } else if (DueEnum.SELECT_DUE_TYPE === activeDialog) {
      return <SelectDueType />;
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

export default DueDialogs;

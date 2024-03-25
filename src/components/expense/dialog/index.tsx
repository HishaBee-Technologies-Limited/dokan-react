'use client';

import React from 'react';
import { ExpenseEnum } from '@/enum/expense';
import { Dialog } from '@/components/common/Dialog';
import { useExpenseStore } from '@/stores/useExpenseStore';
import EditCategory from '@/components/expense/dialog/EditCategory';
import ExpenseDetails from '@/components/expense/dialog/ExpenseDetails';
import AddNewCategory from '@/components/expense/dialog/AddNewCategory';
import DeleteTransaction from '@/components/expense/dialog/DeleteTransaction';
import DeleteExpenseCategory from '@/components/expense/dialog/DeleteExpenseCategory';

const ExpenseDialogs = () => {
  const dialogState = useExpenseStore((state) => state.expenseDialogState);
  const handleClose = useExpenseStore((state) => state.setExpenseDialogState);

  const renderedDrawers = (activeDialog: string | undefined) => {
    if (ExpenseEnum.EXPENSE_DETAILS === activeDialog) {
      return <ExpenseDetails />;
    } else if (ExpenseEnum.ADD_NEW_CATEGORY === activeDialog) {
      return <AddNewCategory />;
    } else if (ExpenseEnum.EDIT_CATEGORY === activeDialog) {
      return <EditCategory />;
    } else if (ExpenseEnum.DELETE_TRANSACTION === activeDialog) {
      return <DeleteTransaction />;
    } else if (ExpenseEnum.DELETE_EXPENSE_CATEGORY === activeDialog) {
      return <DeleteExpenseCategory />;
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

export default ExpenseDialogs;

'use client';

import React from 'react';
import { ExpenseEnum } from '@/enum/expense';
import { Drawer } from '@/components/common/Drawer';
import { useExpenseStore } from '@/stores/useExpenseStore';
import AddExpense from '@/components/expense/drawers/AddExpense';
import EditExpense from '@/components/expense/drawers/EditExpense';
import AllExpenseCategories from '@/components/expense/drawers/AllExpenseCategories';
import { ICategory, IExpense } from '@/types/expense';
import { ICommonGetResponse } from '@/types/common';

const ExpenseDrawers = ({
  expense,
  categories,
}: {
  expense: IExpense;
  categories: ICommonGetResponse<ICategory>;
}) => {
  const drawerState = useExpenseStore((state) => state.expenseDrawerState);
  const handleClose = useExpenseStore((state) => state.setExpenseDrawerState);

  const renderedDrawers = (activeDrawer: string | undefined) => {
    if (ExpenseEnum.ADD_EXPENSE === activeDrawer) {
      return <AddExpense categories={categories} />;
    } else if (ExpenseEnum.EDIT_EXPENSE === activeDrawer) {
      return <EditExpense expense={expense} />;
    } else if (ExpenseEnum.ALL_EXPENSE_CATEGORIES === activeDrawer) {
      return <AllExpenseCategories categories={categories} />;
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

export default ExpenseDrawers;

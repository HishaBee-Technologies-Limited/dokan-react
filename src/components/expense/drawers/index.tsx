"use client";

import React from "react";
import { ExpenseEnum } from "../../../enum/expense";
import { Drawer } from "../../common/Drawer";
import { useExpenseStore } from "../../../stores/useExpenseStore";
import AddExpense from "./AddExpense";
import EditExpense from "./EditExpense";
import AllExpenseCategories from "./AllExpenseCategories";

const ExpenseDrawers = () => {
  const drawerState = useExpenseStore((state) => state.expenseDrawerState);
  const handleClose = useExpenseStore((state) => state.setExpenseDrawerState);

  const renderedDrawers = (activeDrawer: string | undefined) => {
    if (ExpenseEnum.ADD_EXPENSE === activeDrawer) {
      return <AddExpense />;
    } else if (ExpenseEnum.EDIT_EXPENSE === activeDrawer) {
      return <EditExpense />;
    } else if (ExpenseEnum.ALL_EXPENSE_CATEGORIES === activeDrawer) {
      return <AllExpenseCategories />;
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

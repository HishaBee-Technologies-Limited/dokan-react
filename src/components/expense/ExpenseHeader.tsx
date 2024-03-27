'use client';
import React from 'react';
import Icon from '@/components/common/Icon';
import { ExpenseEnum } from '@/enum/expense';
import { Button } from '@/components/ui/button';
import { AddIcon } from '@/components/common/icons';
import { PageTitle } from '@/components/common/text';
import { useExpenseStore } from '@/stores/useExpenseStore';

const ExpenseHeader = () => {
  const handleDrawerOpen = useExpenseStore(
    (state) => state.setExpenseDrawerState
  );

  return (
    <div className="flex flex-wrap gap-space16 justify-between items-center">
      <PageTitle title="Expense Report" />

      <div className="flex gap-space16">
        <Button
          variant={'secondary'}
          onClick={() =>
            handleDrawerOpen({
              open: true,
              header: ExpenseEnum.ALL_EXPENSE_CATEGORIES,
            })
          }
        >
          <Icon icon="f7:menu" height={20} width={20} />
          <span>খরচের খাতসমূহ</span>
        </Button>
        <Button
          onClick={() =>
            handleDrawerOpen({ open: true, header: ExpenseEnum.ADD_EXPENSE })
          }
        >
          <AddIcon />
          <span>নতুন খরচ যোগ করুন</span>
        </Button>
      </div>
    </div>
  );
};

export default ExpenseHeader;

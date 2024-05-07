import React from 'react';
import ExpenseDialogs from '@/components/expense/dialog';
import ExpenseDrawers from '@/components/expense/drawers';
import ExpenseChart from '@/components/expense/ExpenseChart';
import ExpenseTable from '@/components/expense/ExpenseTable';
import ExpenseHeader from '@/components/expense/ExpenseHeader';
import ExpenseQueries from '@/components/expense/ExpenseQueries';
import { getAllExpense } from '@/actions/expense/getAllExpense';
import { getSingleExpense } from '@/actions/expense/getSingleExpense';

const ExpansePage = async ({ searchParams }: any) => {
  const expenseList = await getAllExpense(searchParams.page);
  let singleExpense;
  if (searchParams.expense) {
    singleExpense = await getSingleExpense(searchParams.expense);
    console.log(singleExpense);
  }
  return (
    <>
      <div className="space-y-space16 h-full w-full">
        <ExpenseHeader />
        {/* <ExpenseChart /> */}
        {/* <ExpenseQueries /> */}
        <ExpenseTable expenseList={expenseList?.data} />
      </div>

      <ExpenseDrawers expense={singleExpense?.data} />
      <ExpenseDialogs expense={singleExpense?.data} />
    </>
  );
};

export default ExpansePage;

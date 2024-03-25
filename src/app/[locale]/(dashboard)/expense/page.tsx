import React from 'react';
import ExpenseDialogs from '@/components/expense/dialog';
import ExpenseDrawers from '@/components/expense/drawers';
import ExpenseChart from '@/components/expense/ExpenseChart';
import ExpenseTable from '@/components/expense/ExpenseTable';
import ExpenseHeader from '@/components/expense/ExpenseHeader';
import ExpenseQueries from '@/components/expense/ExpenseQueries';

const ExpansePage = () => {
  return (
    <>
      <div className="space-y-space16 h-full w-full">
        <ExpenseHeader />
        <ExpenseChart />
        <ExpenseQueries />
        <ExpenseTable />
      </div>

      <ExpenseDrawers />
      <ExpenseDialogs />
    </>
  );
};

export default ExpansePage;

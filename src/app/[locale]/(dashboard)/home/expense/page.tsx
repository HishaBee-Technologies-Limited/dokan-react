import { getExpenseReport } from '@/actions/dashboard/getExpenseReport';
import PageHeader from '@/components/dashboard/expense/Header';
import ExpenseReportTable from '@/components/dashboard/expense/Table';

export default async function Expense({ searchParams }: any) {
  const expenseReport = await getExpenseReport(
    '2020-10-01 00:00:00',
    '2022-10-01 00:00:00'
  );

  return (
    <div className="space-y-space16 h-full w-full">
      <PageHeader />
      <ExpenseReportTable expenseReport={expenseReport?.data as any} />
    </div>
  );
}

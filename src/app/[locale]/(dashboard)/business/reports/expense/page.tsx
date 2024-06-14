import PageHeader from '@/components/expense-report/PageHeader';
import { getExpenseReport } from '@/actions/expense-report/getExpenseReport';
import ExpenseReportTable from '@/components/expense-report/ExpenseReportTable';

export default async function Expense({ searchParams }: any) {
  const expenseReport = await getExpenseReport(
    searchParams.start_date,
    searchParams.end_date
  );

  return (
    <div className="space-y-space16 h-full w-full">
      <PageHeader />
      <ExpenseReportTable expenseReport={expenseReport?.data as any} />
    </div>
  );
}

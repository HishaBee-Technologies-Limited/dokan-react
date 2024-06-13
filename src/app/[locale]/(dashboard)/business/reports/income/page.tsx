import PageHeader from '@/components/income-report/PageHeader';
import { getIncomeReport } from '@/actions/income-report/getIncomeReport';
import IncomeReportTable from '@/components/income-report/IncomeReportTable';

export default async function Income({ searchParams }: any) {
  const incomeReport = await getIncomeReport(
    searchParams.start_date,
    searchParams.end_date
  );

  return (
    <div className="space-y-space16 h-full w-full">
      <PageHeader />
      <IncomeReportTable incomeReport={incomeReport?.data as any} />
    </div>
  );
}

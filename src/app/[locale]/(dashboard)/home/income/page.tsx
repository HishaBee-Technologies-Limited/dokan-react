import { getIncomeReport } from '@/actions/dashboard/getIncomeREport';
import PageHeader from '@/components/dashboard/income/Header';
import IncomeReportTable from '@/components/dashboard/income/Table';

export default async function Income({ searchParams }: any) {
  const incomeReport = await getIncomeReport(
    '2020-11-10 00:00:00',
    '2024-11-10 00:00:00'
  );

  return (
    <div className="space-y-space16 h-full w-full">
      <PageHeader />
      <IncomeReportTable incomeReport={incomeReport?.data as any} />
    </div>
  );
}

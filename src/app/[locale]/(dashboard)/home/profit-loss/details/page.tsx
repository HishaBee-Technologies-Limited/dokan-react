import { getTransactionReport } from '@/actions/dashboard/getTransactionReport';
import PageHeader from '@/components/dashboard/profit-loss/Header';
import ProfitLossReportTable from '@/components/dashboard/profit-loss/ProfitLossReportTable';

export default async function ProfitLossDetails({ searchParams }: any) {
  const transactionReport = await getTransactionReport(
    searchParams.start_date,
    searchParams.end_date
  );

  return (
    <div className="space-y-space16 h-full w-full">
      <PageHeader />
      <ProfitLossReportTable
        transactionReport={transactionReport?.data as any}
      />
    </div>
  );
}

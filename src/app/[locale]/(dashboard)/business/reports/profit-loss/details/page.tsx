import PageHeader from '@/components/profit-loss-report/PageHeader';
import { getTransactionReport } from '@/actions/transaction-report/getTransactionReport';
import ProfitLossReportTable from '@/components/profit-loss-report/ProfitLossReportTable';

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

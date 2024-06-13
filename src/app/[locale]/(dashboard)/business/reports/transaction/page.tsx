import PageHeader from '@/components/transaction-report/PageHeader';
import TransactionReportTable from '@/components/transaction-report/TransactionReportTable';
import { getTransactionReport } from '@/actions/transaction-report/getTransactionReport';

export default async function Transaction({ searchParams }: any) {
  const transactionReport = await getTransactionReport(
    searchParams.start_date,
    searchParams.end_date
  );

  return (
    <div className="space-y-space16 h-full w-full">
      <PageHeader />
      <TransactionReportTable
        transactionReport={transactionReport?.data as any}
      />
    </div>
  );
}

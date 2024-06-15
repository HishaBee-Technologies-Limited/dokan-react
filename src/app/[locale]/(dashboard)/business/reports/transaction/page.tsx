import PageHeader from '@/components/transaction-report/PageHeader';
import TransactionReportTable from '@/components/transaction-report/TransactionReportTable';
import { getTransactionReport } from '@/actions/transaction-report/getTransactionReport';
import { Text } from '@/components/common/text';

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

      {/*<div className="py-10 px-6 sticky bottom-0 left-0 z-50 w-full bg-blue-600 border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">*/}
      {/*  <div className="flex justify-between items-center w-full">*/}
      {/*    <Text variant="white" className="font-medium text-lg">*/}
      {/*      Total Sell*/}
      {/*    </Text>*/}
      {/*    <Text variant="white" className="font-medium text-lg">*/}
      {/*      ৳ 92,0000*/}
      {/*    </Text>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}

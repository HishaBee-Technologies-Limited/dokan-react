import PageHeader from '@/components/purchase-report/PageHeader';
import { getPurchaseReport } from '@/actions/purchase-report/getPurchaseReport';
import PurchaseReportTable from '@/components/purchase-report/PurchaseReportTable';

export default async function Purchase({ searchParams }: any) {
  const purchaseReport = await getPurchaseReport(
    searchParams.start_date,
    searchParams.end_date
  );

  return (
    <div className="space-y-space16 h-full w-full">
      <PageHeader />

      <PurchaseReportTable purchaseReport={purchaseReport?.data as any} />
    </div>
  );
}

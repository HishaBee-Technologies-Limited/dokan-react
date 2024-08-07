import { getPurchaseReport } from '@/actions/dashboard/getPurchaseReport';
import PageHeader from '@/components/dashboard/purchase/Header';
import PurchaseReportTable from '@/components/dashboard/purchase/Table';

export default async function Purchase({ searchParams }: any) {
  const purchaseReport = await getPurchaseReport(
    '2020-11-10 00:00:00',
    '2024-11-10 00:00:00'
  );

  return (
    <div className="space-y-space16 h-full w-full">
      <PageHeader />

      <PurchaseReportTable purchaseReport={purchaseReport?.data as any} />
    </div>
  );
}

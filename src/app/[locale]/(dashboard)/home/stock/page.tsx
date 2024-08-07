import { getStockReports } from '@/actions/dashboard/getStockReport';
import ProductReportTable from '@/components/dashboard/product/Table';
import PageHeader from '@/components/dashboard/stock/Header';

export default async function Stock({ searchParams }: any) {
  const stockReport = await getStockReports(
    '2020-11-10 00:00:00',
    '2024-11-10 00:00:00'
  );

  return (
    <div className="space-y-space16 h-full w-full">
      <PageHeader />
      <ProductReportTable stockReport={stockReport?.data as any} />
    </div>
  );
}

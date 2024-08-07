import { getProductReport } from '@/actions/dashboard/getProductReport';
import PageHeader from '@/components/dashboard/product/Header';
import ProductReportTable from '@/components/dashboard/stock/Table';

export default async function Product({ searchParams }: any) {
  const productReport = await getProductReport(
    '2020-11-10 00:00:00',
    '2024-11-10 00:00:00'
  );

  return (
    <div className="space-y-space16 h-full w-full">
      <PageHeader />
      <ProductReportTable productReport={productReport?.data as any} />
    </div>
  );
}

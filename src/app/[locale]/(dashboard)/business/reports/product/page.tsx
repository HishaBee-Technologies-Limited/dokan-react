import StockReportTable from '@/components/stock-report/StockReportTable';
import PageHeader from '@/components/product-report/PageHeader';
import { getProductReport } from '@/actions/product-report/getProductReport';

export default async function Product({ searchParams }: any) {
  const productReport = await getProductReport(
    searchParams.start_date,
    searchParams.end_date
  );

  return (
    <div className="space-y-space16 h-full w-full">
      <PageHeader />
      <StockReportTable productReport={productReport?.data as any} />
    </div>
  );
}

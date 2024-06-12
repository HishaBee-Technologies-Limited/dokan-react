import PageHeader from '@/components/stock-report/PageHeader';
import { getStockReports } from '@/actions/business-reports/getStockReport';
import StockReportTable from '@/components/stock-report/StockReportTable';

export default async function Stock({ searchParams }: any) {
  const stockReport = await getStockReports(
    searchParams.start_date,
    searchParams.end_date
  );

  return (
    <div className="space-y-space16 h-full w-full">
      <PageHeader />
      <StockReportTable stockReport={stockReport?.data as any} />
    </div>
  );
}

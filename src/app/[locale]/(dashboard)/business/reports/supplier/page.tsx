import SupplierReportTable from '@/components/supplier-report/SupplierReportTable';
import { getSupplierReport } from '@/actions/supplier-report/getSupplierReport';
import PageHeader from '@/components/supplier-report/PageHeader';

export default async function Supplier({ searchParams }: any) {
  const supplierReport = await getSupplierReport(
    searchParams.start_date,
    searchParams.end_date
  );

  return (
    <div className="space-y-space16 h-full w-full">
      <PageHeader />
      <SupplierReportTable supplierReport={supplierReport?.data as any} />
    </div>
  );
}

import { getSupplierReport } from '@/actions/dashboard/getSupplierREport';
import PageHeader from '@/components/dashboard/supplier/Header';
import SupplierReportTable from '@/components/dashboard/supplier/Table';

export default async function Supplier({ searchParams }: any) {
  const supplierReport = await getSupplierReport(
    '2020-11-10 00:00:00',
    '2024-11-10 00:00:00'
  );

  return (
    <div className="space-y-space16 h-full w-full">
      <PageHeader />
      <SupplierReportTable supplierReport={supplierReport?.data as any} />
    </div>
  );
}

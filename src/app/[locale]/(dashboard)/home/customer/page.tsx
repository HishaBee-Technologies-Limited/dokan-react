import { getCustomerReport } from '@/actions/dashboard/getCustomerReport';
import PageHeader from '@/components/dashboard/customer/Header';
import CustomerReportTable from '@/components/dashboard/customer/Table';

export default async function Customer({ searchParams }: any) {
  const customerReport = await getCustomerReport(
    '2020-11-10 00:00:00',
    '2024-11-10 00:00:00'
  );

  return (
    <div className="space-y-space16 h-full w-full">
      <PageHeader />
      <CustomerReportTable customerReport={customerReport?.data as any} />
    </div>
  );
}

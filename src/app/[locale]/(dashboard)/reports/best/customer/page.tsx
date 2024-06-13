import PageHeader from '@/components/customer-report/PageHeader';
import { getCustomerReport } from '@/actions/customer-report/getCustomerReport';
import CustomerReportTable from '@/components/customer-report/CustomerReportTable';

export default async function Customer({ searchParams }: any) {
  const customerReport = await getCustomerReport(
    searchParams.start_date,
    searchParams.end_date
  );

  return (
    <div className="space-y-space16 h-full w-full">
      <PageHeader />
      <CustomerReportTable customerReport={customerReport?.data as any} />
    </div>
  );
}

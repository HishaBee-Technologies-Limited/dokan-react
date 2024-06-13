import PageHeader from '@/components/employee-report/PageHeader';
import EmployeeReportTable from '@/components/employee-report/EmployeeReportTable';
import { getEmployeeReport } from '@/actions/employee-report/getEmployeeReport';

export default async function Employee({ searchParams }: any) {
  const employeeReport = await getEmployeeReport(
    searchParams.start_date,
    searchParams.end_date
  );

  return (
    <div className="space-y-space16 h-full w-full">
      <PageHeader />
      <EmployeeReportTable employeeReport={employeeReport?.data as any} />
    </div>
  );
}

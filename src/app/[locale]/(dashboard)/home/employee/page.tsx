import { getEmployeeReport } from '@/actions/dashboard/getEmployeeReport';
import PageHeader from '@/components/dashboard/employee/Header';
import EmployeeReportTable from '@/components/dashboard/employee/Table';

export default async function Employee({ searchParams }: any) {
  const employeeReport = await getEmployeeReport(
    '2020-11-10 00:00:00',
    '2024-11-10 00:00:00'
  );

  return (
    <div className="space-y-space16 h-full w-full">
      <PageHeader />
      <EmployeeReportTable employeeReport={employeeReport?.data as any} />
    </div>
  );
}

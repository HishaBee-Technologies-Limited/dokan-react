import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import React from 'react';
import NoDataCard from '@/components/common/no-data-card';
import { IEmployeeReportsResponse } from '@/types/dashboard';

type EmployeeReportTablePropsType = {
  employeeReport: IEmployeeReportsResponse[];
};

export default function EmployeeReportTable({
  employeeReport,
}: EmployeeReportTablePropsType) {
  return (
    <ScrollArea className="pb-space8">
      {!!employeeReport?.length ? (
        <>
          <Table wrapperClass="rounded-md border border-color">
            <TableHeader>
              <TableRow>
                <TableHead className="">#</TableHead>
                <TableHead>Employee Name</TableHead>
                <TableHead>Transaction Quantity</TableHead>
                <TableHead>Transaction Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {employeeReport?.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.employee}</TableCell>
                    <TableCell>{item.transaction_count}</TableCell>
                    <TableCell>{item.transaction_amount}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </>
      ) : (
        <NoDataCard />
      )}
    </ScrollArea>
  );
}

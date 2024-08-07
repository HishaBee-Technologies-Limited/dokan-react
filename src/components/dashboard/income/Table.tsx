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
import { IIncomeReportsResponse } from '@/types/dashboard';

type IncomeReportTablePropsType = {
  incomeReport: IIncomeReportsResponse[];
};

export default function IncomeReportTable({
  incomeReport,
}: IncomeReportTablePropsType) {
  return (
    <ScrollArea className="pb-space8">
      {!!incomeReport?.length ? (
        <>
          <Table wrapperClass="rounded-md border border-color">
            <TableHeader>
              <TableRow>
                <TableHead className="">#</TableHead>
                <TableHead>Category Name</TableHead>
                <TableHead>Income Quantity</TableHead>
                <TableHead>Income Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {incomeReport?.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.income}</TableCell>
                    <TableCell>{item.income_count}</TableCell>
                    <TableCell>{item.income_amount}</TableCell>
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

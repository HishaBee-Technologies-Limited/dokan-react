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
import { IExpenseReportsResponse } from '@/types/ExpenseReport';

type ExpenseReportTablePropsType = {
  expenseReport: IExpenseReportsResponse[];
};

export default function ExpenseReportTable({
  expenseReport,
}: ExpenseReportTablePropsType) {
  return (
    <ScrollArea className="pb-space8">
      {!!expenseReport?.length ? (
        <>
          <Table wrapperClass="rounded-md border border-color">
            <TableHeader>
              <TableRow>
                <TableHead className="">#</TableHead>
                <TableHead>Category Name</TableHead>
                <TableHead>Expense Quantity</TableHead>
                <TableHead>Expense Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {expenseReport?.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.expense}</TableCell>
                    <TableCell>{item.expense_count}</TableCell>
                    <TableCell>৳ {item.expense_amount}</TableCell>
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

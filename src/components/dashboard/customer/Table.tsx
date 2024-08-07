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
import { ICustomerReportsResponse } from '@/types/dashboard';

type CustomerReportTablePropsType = {
  customerReport: ICustomerReportsResponse[];
};

export default function CustomerReportTable({
  customerReport,
}: CustomerReportTablePropsType) {
  return (
    <ScrollArea className="pb-space8">
      {!!customerReport?.length ? (
        <>
          <Table wrapperClass="rounded-md border border-color">
            <TableHeader>
              <TableRow>
                <TableHead className="">#</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Transaction Quantity</TableHead>
                <TableHead>Transaction Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {customerReport?.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.customer}</TableCell>
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

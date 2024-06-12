import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import React from 'react';
import { ISupplierReportsResponse } from '@/types/supplierReport';
import NoDataCard from '@/components/common/no-data-card';

type SupplierReportTableType = {
  supplierReport: ISupplierReportsResponse[];
};

export default function SupplierReportTable({
  supplierReport,
}: SupplierReportTableType) {
  return (
    <ScrollArea className="pb-space8">
      {!!supplierReport?.length ? (
        <Table wrapperClass="rounded-md border border-color">
          <TableHeader>
            <TableRow>
              <TableHead className="">#</TableHead>
              <TableHead>Supplier Name</TableHead>
              <TableHead>Purchase Count</TableHead>
              <TableHead>Purchase Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {supplierReport?.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.supplier}</TableCell>
                  <TableCell>{item.purchase_count}</TableCell>
                  <TableCell>{item.purchase_amount}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <NoDataCard />
      )}
    </ScrollArea>
  );
}

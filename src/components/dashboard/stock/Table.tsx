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
import NoDataCard from '@/components/common/no-data-card';
import { IProductReportsResponse } from '@/types/dashboard';

type ProductReportTableType = {
  productReport: IProductReportsResponse[];
};

export default function ProductReportTable({
  productReport,
}: ProductReportTableType) {
  return (
    <ScrollArea className="pb-space8">
      {!!productReport?.length ? (
        <Table wrapperClass="rounded-md border border-color">
          <TableHeader>
            <TableRow>
              <TableHead className="">#</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Sold Quantity</TableHead>
              <TableHead>Price (without discount)</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {productReport?.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.product_name}</TableCell>
                  <TableCell>{item.sell_count}</TableCell>
                  <TableCell>{item.sell_amount}</TableCell>
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

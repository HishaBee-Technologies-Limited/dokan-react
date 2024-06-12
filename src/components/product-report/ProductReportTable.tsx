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
import { IStockReportsResponse } from '@/types/stockReport';
import { Text } from '@/components/common/text';
import NoDataCard from '@/components/common/no-data-card';

type StockReportTableType = {
  stockReport: IStockReportsResponse[];
};

export default function ProductReportTable({
  stockReport,
}: StockReportTableType) {
  return (
    <ScrollArea className="pb-space8">
      {!!stockReport?.length ? (
        <Table wrapperClass="rounded-md border border-color">
          <TableHeader>
            <TableRow>
              <TableHead className="">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>
                <Text variant="success">Stock In Count</Text>
              </TableHead>
              <TableHead>
                <Text variant="success">Stock In Amount</Text>
              </TableHead>
              <TableHead>
                <Text variant="error">Stock Out Count</Text>
              </TableHead>
              <TableHead>
                <Text variant="error">Stock Out Amount</Text>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {stockReport?.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.product_name}</TableCell>
                  <TableCell>
                    <Text variant="success">{item.stock_in_count}</Text>
                  </TableCell>
                  <TableCell>
                    <Text variant="success">৳{item.stock_in_amount}</Text>
                  </TableCell>
                  <TableCell>
                    <Text variant="error">
                      {item.stock_out_count.toString()}
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Text variant="error">
                      ৳{item.stock_out_amount.toString()}
                    </Text>
                  </TableCell>
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

'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Text } from '@/components/common/text';
import NoDataCard from '@/components/common/no-data-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';
import { ITransactionReportsResponse } from '@/types/TransactionReport';
import { format } from 'date-fns';
import { TRANSACTION_TYPE } from '@/lib/constants/common';

type ProfitLossReportTablePropsType = {
  transactionReport: ITransactionReportsResponse;
};
export default function ProfitLossReportTable({
  transactionReport,
}: ProfitLossReportTablePropsType) {
  console.log(transactionReport);
  return (
    <ScrollArea className="pb-space8">
      {Array.isArray(transactionReport?.items) &&
      transactionReport?.items?.length === 0 ? (
        <NoDataCard />
      ) : (
        <Table wrapperClass="rounded-md border border-color">
          <TableHeader>
            <TableRow>
              <TableHead className="">#</TableHead>
              <TableHead>Bar Code</TableHead>
              <TableHead>
                <Text>Product Sales</Text>
              </TableHead>
              <TableHead>
                <Text variant="success">Total Profit</Text>
              </TableHead>
              <TableHead>
                <Text>Date</Text>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Object.keys(transactionReport.items).map((date) => (
              <React.Fragment key={date}>
                {transactionReport.items[date].map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>#{item.transaction_barcode.slice(-6)}</TableCell>
                    <TableCell>
                      ৳{' '}
                      {item.transaction_type === TRANSACTION_TYPE.PRODUCT_SELL
                        ? item.total_price
                        : 0}
                    </TableCell>
                    <TableCell>৳ {item.total_profit}</TableCell>
                    <TableCell>
                      {format(new Date(item.created_at), 'dd MMM yyyy, HH:mm')}
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      )}
    </ScrollArea>
  );
}

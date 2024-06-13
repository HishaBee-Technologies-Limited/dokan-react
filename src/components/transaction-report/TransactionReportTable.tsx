import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import NoDataCard from '@/components/common/no-data-card';
import React from 'react';
import {
  ITransactionReportsResponse,
  TransactionDef,
} from '@/types/TransactionReport';

type TransactionReportTablePropsType = {
  transactionReport: ITransactionReportsResponse;
};

export default async function TransactionReportTable({
  transactionReport,
}: TransactionReportTablePropsType) {
  return (
    <ScrollArea className="pb-space8">
      {Array.isArray(transactionReport?.items) &&
      transactionReport?.items?.length === 0 ? (
        <NoDataCard />
      ) : (
        <>
          <Table wrapperClass="rounded-md border border-color">
            <TableHeader>
              <TableRow>
                <TableHead className="">Transaction ID</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Total Price</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {Object.keys(transactionReport.items).map((date) => (
                <React.Fragment key={date}>
                  {transactionReport.items[date].map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        #{item.transaction_barcode.slice(-6)}
                      </TableCell>
                      <TableCell>{item.customer_name}</TableCell>
                      <TableCell>{item.total_price}</TableCell>
                      <TableCell>{item.created_at}</TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
              {/*<TableRow key={`${item.transaction_barcode}_${index}`}>*/}
              {/*  <TableCell>*/}
              {/*    #{item.transaction_barcode.slice(-6)}*/}
              {/*  </TableCell>*/}
              {/*  <TableCell>{item.customer_name}</TableCell>*/}
              {/*  <TableCell>{item.total_price}</TableCell>*/}
              {/*  <TableCell>{item.created_at}</TableCell>*/}
              {/*</TableRow>*/}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </>
      )}
    </ScrollArea>
  );
}

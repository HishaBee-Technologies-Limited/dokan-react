'use client';
import React from 'react';
import { Text } from '@/components/common/text';
import { Image } from '@/components/common/Image';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const HistoryTable = () => {
  return (
    <ScrollArea className="pb-space8">
      <Table wrapperClass="rounded-md border border-color !min-w-[90rem]">
        <TableHeader>
          <TableRow>
            <TableHead className="">Product name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Stock Price</TableHead>
            <TableHead>Previous Stock</TableHead>
            <TableHead>Stock Adjustment</TableHead>
            <TableHead className="text-end">Current Stock</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array(10)
            .fill(0)
            .map((item, i) => (
              <TableRow key={item.number}>
                <TableCell>
                  <div className="flex items-center gap-space8">
                    <Image src="" alt="" height={40} width={40} />

                    <Text
                      title={`Nestle Nescafe Classic Instant`}
                      className="text-sm"
                    />
                  </div>
                </TableCell>
                <TableCell>Aug 09, 2024 08:45 PM</TableCell>
                <TableCell>৳ 200</TableCell>
                <TableCell>20</TableCell>
                <TableCell>
                  <Text title="+20" variant="success" />
                </TableCell>
                <TableCell className="text-end">20</TableCell>
              </TableRow>
            ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              Showing 10 of 100 Transactions
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default HistoryTable;

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

export const ProductSummeryTable = () => {
  return (
    <div className="space-y-space12">
      <Text title="Product summery" className="font-semibold text-lg" />

      <ScrollArea className="pb-space8">
        <Table wrapperClass="rounded-md border border-color">
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Total Price</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array(4)
              .fill(0)
              .map((_, idx) => (
                <TableRow key={idx + 'summery'}>
                  <TableCell>
                    <Image src="" alt="" height={40} width={40} />
                  </TableCell>
                  <TableCell>{'কোকাকোলা ৬০০ মিলি'}</TableCell>
                  <TableCell>{3}</TableCell>
                  <TableCell>{'2 x ৳ 50'}</TableCell>
                  <TableCell className="text-right">{'৳ 100'}</TableCell>
                </TableRow>
              ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Showing 10 of 100 Transactions
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

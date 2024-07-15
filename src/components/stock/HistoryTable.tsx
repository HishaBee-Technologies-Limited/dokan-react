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
import { ICommonGetResponse } from '@/types/common';
import { IStockResponse } from '@/types/stock';
import ProductPagination from '../product/ProductPagination';

const HistoryTable = ({
  stocks,
}: {
  stocks: ICommonGetResponse<IStockResponse> | undefined;
}) => {
  console.log(stocks);
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
            <TableHead className="text-end">After Stock</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {stocks?.data.map((item, i) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="flex items-center gap-space8">
                  <Image src="" alt="" height={40} width={40} />

                  <Text title={item.name} className="text-sm" />
                </div>
              </TableCell>
              <TableCell>{item.created_at}</TableCell>
              <TableCell>৳ {item.stock_value}</TableCell>
              <TableCell>{item.before_stock}</TableCell>
              <TableCell>
                <Text
                  title={`${!!item.increase ? '+' : '-'}${Number(item.quantity)}`}
                  variant="success"
                />
              </TableCell>
              <TableCell className="text-end">{item.after_stock}</TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              Showing 20 of {stocks?.total} Transactions
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <ScrollBar orientation="horizontal" />

      <div className="my-10">
        <ProductPagination
          pageCount={Math.ceil(stocks?.total! / stocks?.per_page!)}
          currentPage={stocks?.current_page ?? 0}
          lastPage={stocks?.last_page ?? 0}
        />
      </div>
    </ScrollArea>
  );
};

export default HistoryTable;

'use client';
import React from 'react';
import { ProductEnum } from '@/enum/product';
import { Text } from '@/components/common/text';
import { Image } from '@/components/common/Image';
import { useProductStore } from '@/stores/useProductStore';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { TableDropdownAction } from '@/components/online-shop/product/TableDropdownAction';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const ProductTable = () => {
  const handleDialogOpen = useProductStore((state) => state.setDialogState);

  const handleRowClick = () => {
    handleDialogOpen({ open: true, header: ProductEnum.PRODUCT_DETAILS });
  };

  return (
    <ScrollArea className="pb-space8">
      <Table wrapperClass="rounded-md border border-color">
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Current Stock</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array(6)
            .fill(0)
            .map((row, i) => (
              <TableRow key={i} onClick={() => handleRowClick()}>
                <TableCell>
                  <div className="flex items-center gap-space8">
                    <Image src="" alt="" height={40} width={40} />

                    <Text
                      title={`Nestle Nescafe Classic Instant`}
                      className="text-sm"
                    />
                  </div>
                </TableCell>
                <TableCell>{51}</TableCell>
                <TableCell>{'৳200'}</TableCell>
                <TableCell>{'Generic Names'}</TableCell>
                <TableCell>
                  <Text
                    title="Published"
                    variant="white"
                    className="text-xs rounded-full px-space12 bg-success-100 dark:bg-primary-80 max-w-max"
                  />
                </TableCell>
                <TableCell className={`text-right`}>
                  <TableDropdownAction data={row} />
                </TableCell>
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

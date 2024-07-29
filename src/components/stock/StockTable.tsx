'use client';
import React from 'react';
import { ProductEnum } from '@/enum/product';
import { Text } from '@/components/common/text';
import { Image } from '@/components/common/Image';
import { useProductStore } from '@/stores/useProductStore';
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
import { IProductPayload } from '@/types/product';
import { Package } from 'lucide-react';
import ProductPagination from '../product/ProductPagination';

export const StockTable = ({
  products,
}: {
  products: ICommonGetResponse<IProductPayload>;
}) => {
  const handleDialogOpen = useProductStore((state) => state.setDialogState);

  const handleRowClick = () => {
    handleDialogOpen({ open: true, header: ProductEnum.PRODUCT_DETAILS });
  };

  return (
    <ScrollArea className="pb-space8">
      <Table wrapperClass="rounded-md border border-color">
        <TableHeader>
          <TableRow>
            <TableHead className="">Product name</TableHead>
            <TableHead className="text-end">Current stock</TableHead>
            <TableHead className="text-end">Unit Cost</TableHead>
            <TableHead className="text-end">total stock price</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.data.map((product, i) => (
            <TableRow key={product.id} onClick={() => handleRowClick()}>
              <TableCell>
                <div className="flex items-center gap-space8">
                  {!!product?.image_url && product?.image_url !== 'null' ? (
                    <Image
                      src={product?.image_url}
                      height={40}
                      width={40}
                      alt=""
                    />
                  ) : (
                    <Package size={40} />
                  )}

                  <Text title={product.name} className="text-sm" />
                </div>
              </TableCell>
              <TableCell className="text-end pr-8">{product.stock}</TableCell>
              <TableCell className="text-end pr-8">
                ৳ {product.cost_price}
              </TableCell>
              <TableCell className="text-end pr-8">
                ৳ {Number(product.cost_price!) * product.stock!}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              Showing from {products.from} to {products.from + 19} of{' '}
              {products.total} products
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <ScrollBar orientation="horizontal" />

      <div className="my-10">
        <ProductPagination
          pageCount={Math.ceil(products?.total / products?.per_page)}
          currentPage={products?.current_page ?? 0}
          lastPage={products?.last_page ?? 0}
        />
      </div>
    </ScrollArea>
  );
};

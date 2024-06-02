'use client';
import React from 'react';
import { ProductEnum } from '@/enum/product';
import { Text } from '@/components/common/text';
import { Image } from '@/components/common/Image';
import { useProductStore } from '@/stores/useProductStore';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { TableDropdownAction } from './TableDropdownAction.1';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import { usePathname, useRouter } from 'next/navigation';
import { IProduct } from '@/types/product';
import { cn } from '@/lib/utils';
import ProductPagination from '@/components/product/ProductPagination';

type ProductTableProps = { productData: any; isStatusShow?: boolean };

export const ProductTable = ({
  productData,
  isStatusShow = false,
}: ProductTableProps) => {
  const handleDialogOpen = useProductStore((state) => state.setDialogState);
  const { setQueryString } = useCreateQueryString();
  const pathname = usePathname();
  const router = useRouter();

  const handleRowClick = (product: IProduct) => {
    handleDialogOpen({ open: true, header: ProductEnum.PRODUCT_DETAILS });
    router.push(`${pathname}?${setQueryString('product', product?.unique_id)}`);
  };

  return (
    <ScrollArea className="pb-space8">
      <Table wrapperClass="rounded-md border border-color">
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Current Stock</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Sub Category</TableHead>
            {isStatusShow ? <TableHead>Status</TableHead> : <></>}
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {productData?.data?.map((product: IProduct) => (
            <TableRow key={product?.id} onClick={() => handleRowClick(product)}>
              <TableCell>
                <div className="gap-space8 flex items-center">
                  <img src={product?.image_url} alt="" height={40} width={40} />

                  <Text title={product.name} className="text-sm" />
                </div>
              </TableCell>
              <TableCell>{product?.stock}</TableCell>
              <TableCell>{product?.selling_price}</TableCell>
              <TableCell>{product?.sub_category?.name}</TableCell>
              {isStatusShow ? (
                <TableCell>
                  <Text
                    title="Published"
                    variant="white"
                    className={cn(
                      'text-xs rounded-full px-space12  max-w-max',
                      product?.published
                        ? 'bg-success-100 dark:bg-primary-80'
                        : 'bg-error-100 dark:bg-error-80'
                    )}
                  />
                </TableCell>
              ) : (
                <></>
              )}

              <TableCell className={`text-right`}>
                <TableDropdownAction product={product} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />

      <div className="my-10">
        <ProductPagination
          pageCount={Math.ceil(
            (productData?.total ?? 0) / (productData?.per_page ?? 0)
          )}
          currentPage={productData?.current_page ?? 0}
          lastPage={productData?.last_page ?? 0}
        />
      </div>
    </ScrollArea>
  );
};

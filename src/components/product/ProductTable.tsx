"use client";
import React from "react";
import { ProductEnum } from "@/enum/product";
import { Text } from "@/components/common/text";
import { Image } from "@/components/common/Image";
import { useProductStore } from "@/stores/useProductStore";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TableDropdownAction } from "@/components/product/TableDropdownAction";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const ProductTable = ({ productData }: { productData: any }) => {
  const handleDialogOpen = useProductStore((state) => state.setDialogState);

  console.log(productData);

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
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {productData?.data.data?.map((product: any, i: number) => (
            <TableRow key={product.id} onClick={() => handleRowClick()}>
              <TableCell>
                <div className="flex items-center gap-space8">
                  <Image
                    src={product.image_url}
                    alt=""
                    height={40}
                    width={40}
                  />

                  <Text title={product.name} className="text-sm" />
                </div>
              </TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.selling_price}</TableCell>
              <TableCell>{product.sub_category.name}</TableCell>
              <TableCell className={`text-right`}>
                <TableDropdownAction data={product} />
              </TableCell>
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
  );
};

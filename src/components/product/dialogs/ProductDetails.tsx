import React, { useEffect, useState } from 'react';
import Icon from '@/components/common/Icon';
import { ProductEnum } from '@/enum/product';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { Image } from '@/components/common/Image';
import { DialogFooter } from '@/components/common/Dialog';
import { useProductStore } from '@/stores/useProductStore';
import { HistoryIcon } from '@/components/common/icons/HistoryIcon';
import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  MoreVertIcon,
} from '@/components/common/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IProduct } from '@/types/product';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { productProfitCalculation } from '@/lib/utils';

export const ProductDetails = ({ product }: { product: IProduct }) => {
  const handleDialogOpen = useProductStore((state) => state.setDialogState);
  const handleDrawerOpen = useProductStore((state) => state.setDrawerState);

  return (
    <div>
      {product?.name ? (
        <div className="px-space16 space-y-space16 py-space16">
          <div className="border-color pb-space16 gap-space16 flex justify-between border-b">
            <div className="gap-space8 flex items-center">
              <Image src="" alt="" height={40} width={40} />

              <article className="space-y-space4">
                <Text title={product?.name} className="text-sm font-semibold" />
                <Text
                  title={String(product?.selling_price)}
                  variant="secondary"
                  className="text-sm font-semibold"
                />
              </article>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size={'icon'} variant={'transparent'}>
                  <MoreVertIcon />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" side="bottom" className="w-56">
                <DropdownMenuItem asChild>
                  <Button
                    size={'sm'}
                    variant={'transparent'}
                    className="w-full justify-start"
                    onClick={() =>
                      handleDrawerOpen({
                        open: true,
                        header: ProductEnum.EDIT_PRODUCT,
                      })
                    }
                  >
                    <EditIcon />
                    Edit
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Button
                    size={'sm'}
                    variant={'transparent'}
                    className="text-error-100 w-full justify-start"
                    onClick={() =>
                      handleDialogOpen({
                        open: true,
                        header: ProductEnum.DELETE_PRODUCT,
                      })
                    }
                  >
                    <DeleteIcon />
                    Delete
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="gap-space12 grid grid-cols-2 sm:grid-cols-3">
            <article className="px-space12 py-space8 space-y-space4 bg-primary-10 dark:bg-primary-80 rounded-lg">
              <Text
                title={`Stock quantity`}
                variant="secondary"
                className="text-xs font-semibold uppercase"
              />
              <Text title={String(product?.stock)} className="font-semibold" />
            </article>
            <article className="px-space12 py-space8 space-y-space4 bg-primary-10 dark:bg-primary-80 rounded-lg">
              <Text
                title={`selling price`}
                variant="secondary"
                className="text-xs font-semibold uppercase"
              />
              <Text
                title={`৳ ${String(product?.selling_price)}`}
                className="font-semibold"
              />
            </article>
            <article className="px-space12 py-space8 space-y-space4 bg-primary-10 dark:bg-primary-80 rounded-lg">
              <Text
                title={`total profit`}
                variant="secondary"
                className="text-xs font-semibold uppercase"
              />
              <Text
                title={`৳ ${String(
                  productProfitCalculation(
                    product?.cost_price,
                    product?.selling_price,
                    product?.stock
                  )
                )}`}
                className="font-semibold"
              />
            </article>
            <article className="px-space12 py-space8 space-y-space4 bg-primary-10 dark:bg-primary-80 rounded-lg">
              <Text
                title={`buying price`}
                variant="secondary"
                className="text-xs font-semibold uppercase"
              />
              <Text
                title={`৳ ${String(product?.cost_price)}`}
                className="font-semibold"
              />
            </article>
            <article className="px-space12 py-space8 space-y-space4 bg-primary-10 dark:bg-primary-80 rounded-lg">
              <Text
                title={`discount`}
                variant="secondary"
                className="text-xs font-semibold uppercase"
              />
              <Text
                title={String(product?.discount)}
                className="font-semibold"
              />
            </article>
            <article className="px-space12 py-space8 space-y-space4 bg-primary-10 dark:bg-primary-80 rounded-lg">
              <Text
                title={`category`}
                variant="secondary"
                className="text-xs font-semibold uppercase"
              />
              <Text
                title={String(product?.sub_category?.name ?? 'N/A') ?? '--'}
                className="font-semibold"
              />
            </article>
          </div>

          <Text
            title="More details of product"
            className="text-sm font-semibold uppercase"
          />

          <div className="gap-space12 pb-space16 border-color grid grid-cols-2 border-b sm:grid-cols-3">
            <article className="px-space12 py-space8 space-y-space4 bg-primary-10 dark:bg-primary-80 rounded-lg">
              <Text
                title={`vat (%)`}
                variant="secondary"
                className="text-xs font-semibold uppercase"
              />
              <Text
                title={String(product?.vat_percent)}
                className="font-semibold"
              />
            </article>
            <article className="px-space12 py-space8 space-y-space4 bg-primary-10 dark:bg-primary-80 rounded-lg">
              <Text
                title={`Warranty`}
                variant="secondary"
                className="text-xs font-semibold uppercase"
              />
              <Text
                title={String(product?.warranty)}
                className="font-semibold"
              />
            </article>
            <article className="px-space12 py-space8 space-y-space4 bg-primary-10 dark:bg-primary-80 rounded-lg">
              <Text
                title={`low stock alert level`}
                variant="secondary"
                className="text-xs font-semibold uppercase"
              />
              <Text
                title={String(product?.stock_alert)}
                className="font-semibold"
              />
            </article>
          </div>

          <Text
            title="Product details"
            className="text-sm font-semibold uppercase"
          />

          <ScrollArea className="h-40 ">
            <Text
              variant="secondary"
              className="text-sm"
              title={product?.description ?? ''}
            />
          </ScrollArea>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 p-40">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-12 w-3/4" />
        </div>
      )}

      <DialogFooter className="gap-space16 flex flex-col rounded-b-lg">
        <Button
          className="w-full"
          onClick={() =>
            handleDialogOpen({ open: true, header: ProductEnum.UPDATE_STOCK })
          }
        >
          <AddIcon />
          Update stock
        </Button>

        <div className="gap-space12 flex">
          <Button
            variant={'secondary'}
            className="w-full !font-medium"
            onClick={() =>
              handleDialogOpen({
                open: true,
                header: ProductEnum.SHARE_PRODUCT,
              })
            }
          >
            <Icon icon="lucide:share" />
            Share Product
          </Button>
          <Button
            variant={'secondary'}
            className="w-full !font-medium"
            onClick={() =>
              handleDialogOpen({
                open: true,
                header: ProductEnum.PRODUCT_HISTORY,
              })
            }
          >
            <HistoryIcon />
            Product History
          </Button>
        </div>
      </DialogFooter>
    </div>
  );
};

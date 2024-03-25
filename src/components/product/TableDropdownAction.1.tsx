import React from 'react';
import Image from 'next/image';
import Icon from '@/components/common/Icon';
import { ProductEnum } from '@/enum/product';
import { Button } from '@/components/ui/button';
import { useProductStore } from '@/stores/useProductStore';
import { EditIcon, MoreVertIcon } from '@/components/common/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IProduct } from '@/types/product';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import { usePathname, useRouter } from 'next/navigation';

export const TableDropdownAction = ({ product }: { product: IProduct }) => {
  const handleDialogOpen = useProductStore((state) => state.setDialogState);
  const handleDrawerOpen = useProductStore((state) => state.setDrawerState);
  const { setQueryString } = useCreateQueryString();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={'icon'}
          variant={'transparent'}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <MoreVertIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" side="bottom" className="">
        <DropdownMenuLabel>{'Product Name'}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button
            size={'sm'}
            variant={'transparent'}
            className="w-full justify-start"
            onClick={(e) => {
              e.stopPropagation();
              handleDialogOpen({
                open: true,
                header: ProductEnum.PRODUCT_DETAILS,
              });
              router.push(
                `${pathname}?${setQueryString('product', product?.unique_id)}`
              );
            }}
          >
            <Icon icon="carbon:folder-details" />
            View Details
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            size={'sm'}
            variant={'transparent'}
            className="w-full justify-start"
            onClick={(e) => {
              e.stopPropagation();
              handleDrawerOpen({
                open: true,
                header: ProductEnum.EDIT_PRODUCT,
              });
              router.push(
                `${pathname}?${setQueryString('product', product?.unique_id)}`
              );
            }}
          >
            <EditIcon />
            Edit
          </Button>
        </DropdownMenuItem>
        {/* TODO: implement this later */}
        {/* <DropdownMenuItem asChild>
          <Button
            size={"sm"}
            variant={"transparent"}
            className="w-full justify-start"
            onClick={(e) => {
              e.stopPropagation();
              handleDrawerOpen({
                open: true,
                header: ProductEnum.EDIT_PRODUCT,
              });
              router.push(
                `${pathname}?${setQueryString("product", product?.unique_id)}`
              );
            }}
          >
            <Icon icon="humbleicons:duplicate" />
            Duplicate
          </Button>
        </DropdownMenuItem> */}
        <DropdownMenuItem asChild>
          <Button
            size={'sm'}
            variant={'transparent'}
            className="w-full justify-start"
            onClick={(e) => {
              e.stopPropagation();
              handleDialogOpen({
                open: true,
                header: ProductEnum.UPDATE_STOCK,
              });
              router.push(
                `${pathname}?${setQueryString('product', product?.unique_id)}`
              );
            }}
          >
            <Image src={'/images/update.svg'} alt="" height={16} width={16} />
            Update Stock
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button
            size={'sm'}
            variant={'transparent'}
            className="w-full justify-start"
            onClick={(e) => {
              e.stopPropagation();
              handleDialogOpen({
                open: true,
                header: ProductEnum.SHARE_PRODUCT,
              });
            }}
          >
            <Icon icon="ri:links-line" />
            Share Product Link
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

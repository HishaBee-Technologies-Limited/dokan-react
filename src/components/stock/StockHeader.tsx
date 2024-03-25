'use client';
import React from 'react';
import Link from 'next/link';
import Icon from '@/components/common/Icon';
import { ProductEnum } from '@/enum/product';
import { Button } from '@/components/ui/button';
import { AddIcon } from '@/components/common/icons';
import { PageTitle } from '@/components/common/text';
import { useProductStore } from '@/stores/useProductStore';
import { HistoryIcon } from '@/components/common/icons/HistoryIcon';

export const StockHeader = () => {
  const handleDrawerOpen = useProductStore((state) => state.setDrawerState);

  return (
    <div className="flex flex-wrap gap-space16 justify-between items-center">
      <PageTitle title="Stock Management" />

      <div className="flex gap-space12 grow-[1] sm:grow-0">
        <Link href="/stock/history">
          <Button variant={'secondary'}>
            <HistoryIcon />
            <span>Stock History</span>
          </Button>
        </Link>
        <Link href="/stock/update">
          <Button variant={'secondary'}>
            <Icon icon="material-symbols:work-update-outline" />
            <span>Update stock quantity</span>
          </Button>
        </Link>

        <Button
          className="grow"
          onClick={() =>
            handleDrawerOpen({ open: true, header: ProductEnum.ADD_PRODUCT })
          }
        >
          <AddIcon />
          <span>Add new product</span>
        </Button>
      </div>
    </div>
  );
};

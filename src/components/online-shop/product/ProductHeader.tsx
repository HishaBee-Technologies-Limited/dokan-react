'use client';
import React from 'react';
import { ProductEnum } from '@/enum/product';
import { Button } from '@/components/ui/button';
import { AddIcon } from '@/components/common/icons';
import { PageSubTitle } from '@/components/common/text';
import { useProductStore } from '@/stores/useProductStore';

export const ProductHeader = () => {
  const handleDrawerOpen = useProductStore((state) => state.setDrawerState);

  return (
    <div className="flex flex-wrap gap-space16 justify-between items-center">
      <PageSubTitle title="Product List" />

      <Button
        onClick={() =>
          handleDrawerOpen({ open: true, header: ProductEnum.ADD_PRODUCT })
        }
      >
        <AddIcon />
        <span>Add new product</span>
      </Button>
    </div>
  );
};

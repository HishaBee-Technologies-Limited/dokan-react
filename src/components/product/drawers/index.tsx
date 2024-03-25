'use client';

import React from 'react';
import { ProductEnum } from '@/enum/product';
import { Drawer } from '@/components/common/Drawer';
import { useProductStore } from '@/stores/useProductStore';
import { AddProduct } from '@/components/product/drawers/AddProduct';
import { EditProduct } from '@/components/product/drawers/EditProduct';
import { IProduct, IProductPayload, IUnits } from '@/types/product';
import { usePathname, useRouter } from 'next/navigation';

export const ProductDrawers = ({
  product,
  units,
  productCategories,
}: {
  product: IProduct;
  units: IUnits[];
  productCategories: any;
}) => {
  const drawerState = useProductStore((state) => state.drawerState);
  const handleClose = useProductStore((state) => state.setDrawerState);

  const pathname = usePathname();
  const router = useRouter();

  const handleCloseAndClearParams = ({ open }: { open: boolean }) => {
    handleClose({ open });
    router.push(`${pathname}`);
  };

  const renderedDrawers = (activeDrawer: string | undefined) => {
    if (ProductEnum.ADD_PRODUCT === activeDrawer) {
      return <AddProduct {...{ units }} {...{ productCategories }} />;
    } else if (ProductEnum.EDIT_PRODUCT === activeDrawer) {
      return (
        <EditProduct
          product={product}
          {...{ units }}
          {...{ productCategories }}
        />
      );
    }
  };

  return (
    <Drawer
      open={drawerState.open}
      header={drawerState.header}
      onClose={(open) => handleCloseAndClearParams({ open })}
    >
      {renderedDrawers(drawerState.header)}
    </Drawer>
  );
};

'use client';

import React from 'react';
import { ProductEnum } from '@/enum/product';
import { Drawer } from '@/components/common/Drawer';
import { useProductStore } from '@/stores/useProductStore';
import { AddProduct } from '@/components/online-shop/product/drawers/AddProduct';
import { EditProduct } from '@/components/online-shop/product/drawers/EditProduct';

export const ProductDrawers = () => {
  const drawerState = useProductStore((state) => state.drawerState);
  const handleClose = useProductStore((state) => state.setDrawerState);

  const renderedDrawers = (activeDrawer: string | undefined) => {
    if (ProductEnum.ADD_PRODUCT === activeDrawer) {
      return <AddProduct />;
    } else if (ProductEnum.EDIT_PRODUCT === activeDrawer) {
      return <EditProduct />;
    }
  };

  return (
    <Drawer
      open={drawerState.open}
      header={drawerState.header}
      onClose={(open) => handleClose({ open })}
    >
      {renderedDrawers(drawerState.header)}
    </Drawer>
  );
};

'use client';

import React from 'react';
import { ProductEnum } from '@/enum/product';
import { Dialog } from '@/components/common/Dialog';
import { useProductStore } from '@/stores/useProductStore';
import { UpdateStock } from '@/components/online-shop/product/dialogs/UpdateStock';
import { ShareProduct } from '@/components/online-shop/product/dialogs/ShareProduct';
import { DeleteProduct } from '@/components/online-shop/product/dialogs/DeleteProduct';
import { ProductDetails } from '@/components/online-shop/product/dialogs/ProductDetails';
import { ProductHistory } from '@/components/online-shop/product/dialogs/ProductHistory';

export const ProductDialogs = () => {
  const dialogState = useProductStore((state) => state.dialogState);
  const handleClose = useProductStore((state) => state.setDialogState);

  const renderedDrawers = (activeDialog: string | undefined) => {
    if (ProductEnum.UPDATE_STOCK === activeDialog) {
      return <UpdateStock />;
    } else if (ProductEnum.SHARE_PRODUCT === activeDialog) {
      return <ShareProduct />;
    } else if (ProductEnum.PRODUCT_DETAILS === activeDialog) {
      return <ProductDetails />;
    } else if (ProductEnum.PRODUCT_HISTORY === activeDialog) {
      return <ProductHistory />;
    } else if (ProductEnum.DELETE_PRODUCT === activeDialog) {
      return <DeleteProduct />;
    }
  };

  return (
    <Dialog
      open={dialogState.open}
      header={dialogState.header}
      onClose={(open) => handleClose({ open })}
    >
      {renderedDrawers(dialogState.header)}
    </Dialog>
  );
};

'use client';

import React from 'react';
import { ProductEnum } from '@/enum/product';
import { Dialog } from '@/components/common/Dialog';
import { useProductStore } from '@/stores/useProductStore';
import { UpdateStock } from '@/components/product/dialogs/UpdateStock';
import { ShareProduct } from '@/components/product/dialogs/ShareProduct';
import { DeleteProduct } from '@/components/product/dialogs/DeleteProduct';
import { ProductDetails } from '@/components/product/dialogs/ProductDetails';
import { ProductHistory } from '@/components/product/dialogs/ProductHistory';
import { IProduct, IProductPayload } from '@/types/product';
import { usePathname, useRouter } from 'next/navigation';

export const ProductDialogs = ({ product }: { product: IProduct }) => {
  const dialogState = useProductStore((state) => state.dialogState);
  const handleClose = useProductStore((state) => state.setDialogState);

  const pathname = usePathname();
  const router = useRouter();

  const handleCloseAndClearParams = ({ open }: { open: boolean }) => {
    handleClose({ open });
    router.push(`${pathname}`);
  };

  const productForUpdateStock = {
    uniqueId: product?.unique_id,
    stock: product?.stock,
    name: product?.name,
    sellingPrice: product?.selling_price,
    image: product?.image_url,
    createdAt: product?.created_at,
    version: product?.version,
  };

  const renderedDrawers = (activeDialog: string | undefined) => {
    if (ProductEnum.UPDATE_STOCK === activeDialog) {
      return <UpdateStock product={productForUpdateStock} />;
    } else if (ProductEnum.SHARE_PRODUCT === activeDialog) {
      return <ShareProduct />;
    } else if (ProductEnum.PRODUCT_DETAILS === activeDialog) {
      return <ProductDetails product={product} />;
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
      onClose={(open) => handleCloseAndClearParams({ open })}
    >
      {renderedDrawers(dialogState.header)}
    </Dialog>
  );
};

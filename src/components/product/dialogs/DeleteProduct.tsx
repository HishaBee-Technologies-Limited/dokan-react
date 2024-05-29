import React from 'react';
import { Text } from '@/components/common/text';
import { Button } from '@/components/ui/button';
import { DeleteIcon } from '@/components/common/icons';
import { DialogFooter } from '@/components/common/Dialog';
import { useProductStore } from '@/stores/useProductStore';
import { useSearchParams } from 'next/navigation';
import { deleteProduct } from '@/actions/product/deleteProduct';
import { IProduct } from '@/types/product';

export const DeleteProduct = ({ product }: { product: IProduct }) => {
  const handleClose = useProductStore((state) => state.setDialogState);
  const params = useSearchParams();
  const productId = params.get('product');

  const handleDelete = async () => {
    const res = await deleteProduct(product);
    console.log(res);
    handleClose({ open: false });
  };

  return (
    <div className="relative">
      <article className="px-space16 py-space16 space-y-space16">
        <Text
          title="Are you sure you want to Delete this Product?"
          className="text-xl font-semibold"
        />
        <Text
          title="You will not able to save further Product"
          variant="secondary"
          className="text-lg"
        />
      </article>

      <DialogFooter className="flex justify-end gap-space16">
        <Button variant={'danger'} onClick={() => handleDelete()}>
          <DeleteIcon color="#fff" />
          Delete
        </Button>
      </DialogFooter>
    </div>
  );
};

import React from 'react';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { DeleteIcon } from '@/components/common/icons';
import { usePurchaseStore } from '@/stores/usePurchase';
import { DialogFooter } from '@/components/common/Dialog';

const TransactionDelete = () => {
  const handleClose = usePurchaseStore((state) => state.setDialogState);

  return (
    <div className="relative">
      <article className="px-space16 py-space16 space-y-space16">
        <Text
          title="Are you sure you want to Delete this Transaction?"
          className="text-xl font-semibold"
        />
        <Text
          title="You will not able to save further on this Transaction"
          variant="secondary"
          className="text-lg"
        />
      </article>

      <DialogFooter className="flex justify-end gap-space16">
        <Button variant={'danger'} onClick={() => handleClose({ open: false })}>
          <DeleteIcon color="#fff" />
          Delete
        </Button>
      </DialogFooter>
    </div>
  );
};

export default TransactionDelete;

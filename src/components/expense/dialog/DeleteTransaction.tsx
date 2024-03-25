import React from 'react';
import { Text } from '@/components/common/text';
import { Button } from '@/components/ui/button';
import { DeleteIcon } from '@/components/common/icons';
import { DialogFooter } from '@/components/common/Dialog';
import { useExpenseStore } from '@/stores/useExpenseStore';

const DeleteTransaction = () => {
  const closeDialog = useExpenseStore((state) => state.setExpenseDialogState);

  return (
    <div className="relative">
      <article className="px-space16 py-space16 space-y-space16">
        <Text
          title="Are you sure you want to Delete this Transaction?"
          className="text-xl font-semibold"
        />
        <Text
          title="You will not able to save further expense on this Transaction"
          variant="secondary"
          className="text-lg"
        />
      </article>

      <DialogFooter className="flex justify-end gap-space16">
        <Button variant={'danger'} onClick={() => closeDialog({ open: false })}>
          <DeleteIcon color="#fff" />
          Delete
        </Button>
      </DialogFooter>
    </div>
  );
};

export default DeleteTransaction;

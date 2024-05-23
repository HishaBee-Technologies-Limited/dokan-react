import React from 'react';
import { Text } from '@/components/common/text';
import { Button } from '@/components/ui/button';
import { DeleteIcon } from '@/components/common/icons';
import { DialogFooter } from '@/components/common/Dialog';
import { useExpenseStore } from '@/stores/useExpenseStore';
import { deleteExpenseCategory } from '@/actions/category/deleteExpenseCategory';
import { toast } from 'sonner';

const DeleteExpenseCategory = () => {
  const closeDialog = useExpenseStore((state) => state.setExpenseDialogState);
  const currentCategory = useExpenseStore((state) => state.currentCategory);

  const handleDelete = async () => {
    const res = await deleteExpenseCategory({ id: currentCategory });
    console.log(res);
    if (res?.success) {
      toast.success('Category deleted successfully');
      closeDialog({ open: false });
    }
    if (!res?.success) {
      toast.error('something went wrong');
      closeDialog({ open: false });
    }
  };

  return (
    <div className="relative">
      <article className="px-space16 py-space16 space-y-space16">
        <Text
          title="Are you sure you want to Delete this category?"
          className="text-xl font-semibold"
        />
        <Text
          title="You will not able to save further expense on this category"
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

export default DeleteExpenseCategory;

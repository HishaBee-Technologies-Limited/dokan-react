import React from 'react';
import { Text } from '@/components/common/text';
import { Button } from '@/components/ui/button';
import { DeleteIcon } from '@/components/common/icons';
import { DialogFooter } from '@/components/common/Dialog';
import { useExpenseStore } from '@/stores/useExpenseStore';
import { IExpense } from '@/types/expense';
import { toast } from 'sonner';
import { deleteExpense } from '@/actions/expense/deleteExpense';

const DeleteTransaction = ({ expense }: { expense: IExpense }) => {
  const closeDialog = useExpenseStore((state) => state.setExpenseDialogState);
  console.log(expense);

  const handleDelete = async () => {
    const res = await deleteExpense(String(expense?.id!));
    console.log(res);
    if (res?.success) {
      toast.success('Expense deleted successfully');
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
          title="Are you sure you want to Delete this Expense?"
          className="text-xl font-semibold"
        />
        <Text
          title="You will not able to save further expense on this Expense"
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

export default DeleteTransaction;

import React from 'react';
import { Button } from '@/components/ui/button';
import { useSellStore } from '@/stores/useSellStore';
import { DeleteIcon } from '@/components/common/icons';
import { DialogFooter } from '@/components/common/Dialog';
import { Text } from '@/components/common/text';
import { formatDate } from '@/lib/utils';
import { DATE_FORMATS } from '@/lib/constants/common';
import { DEFAULT_DELETE_VERSION } from '@/lib/constants/product';
import { toast } from 'sonner';
import { deleteTransaction } from '@/actions/sell/deleteTransaction';

const TransactionDelete = () => {
  const handleDialogOpen = useSellStore((state) => state.setSellDialogState);
  const currentPurchase = useSellStore((state) => state.currentSell);
  const closeDrawer = useSellStore((state) => state.setSellDrawerState);

  const handleDelete = async () => {
    if (currentPurchase) {
      const res = await deleteTransaction({
        unique_id: currentPurchase.unique_id,
        created_at: currentPurchase.created_at,
        updated_at: formatDate(DATE_FORMATS.default),
        version: DEFAULT_DELETE_VERSION,
        total_item: currentPurchase.total_item,
        total_price: currentPurchase.total_price,
        payment_method: currentPurchase.payment_method,
        user_id: currentPurchase.user_id,
      });
      if (res?.success) {
        toast.success('Transaction was successfully deleted');
        handleDialogOpen({ open: false });
        closeDrawer({ open: false });
      }
      if (!res?.success) {
        toast.error('Something went wrong');
        handleDialogOpen({ open: false });
        closeDrawer({ open: false });
      }
    }
  };

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
        <Button variant={'danger'} onClick={() => handleDelete()}>
          <DeleteIcon color="#fff" />
          Delete
        </Button>
      </DialogFooter>
    </div>
  );
};

export default TransactionDelete;

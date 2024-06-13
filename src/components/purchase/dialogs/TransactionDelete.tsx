import React from 'react';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { DeleteIcon } from '@/components/common/icons';
import { usePurchaseStore } from '@/stores/usePurchase';
import { DialogFooter } from '@/components/common/Dialog';
import { usePurchase } from '@/stores/usePurchaseStore';
import { deletePurchase } from '@/actions/purchase/deletePurchase';
import {
  DEFAULT_DELETE_VERSION,
  DEFAULT_STARTING_VERSION,
} from '@/lib/constants/product';
import { DATE_FORMATS } from '@/lib/constants/common';
import { formatDate } from '@/lib/utils';
import { toast } from 'sonner';
import { deleteTransaction } from '@/actions/sell/deleteTransaction';

const TransactionDelete = () => {
  const handleClose = usePurchaseStore((state) => state.setDialogState);
  const currentPurchase = usePurchase((state) => state.currentPurchase);

  const handleDelete = async () => {
    if (currentPurchase) {
      const res = await deletePurchase({
        unique_id: currentPurchase.unique_id,
        created_at: currentPurchase.created_at,
        updated_at: formatDate(DATE_FORMATS.default),
        version: DEFAULT_DELETE_VERSION,
        total_item: currentPurchase.total_item,
        total_price: currentPurchase.total_price,
        payment_method: currentPurchase.payment_method,
        user_id: currentPurchase.user_id,
        payment_status: currentPurchase.payment_status,
      });
      if (res?.success) {
        toast.success('Purchase was successfully deleted');
        handleClose({ open: false });
      }
      if (!res?.success) {
        toast.error('Something went wrong');
        handleClose({ open: false });
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

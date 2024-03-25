'use client';
import React from 'react';
import Image from 'next/image';
import { ExpenseEnum } from '@/enum/expense';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { DialogFooter } from '@/components/common/Dialog';
import { useExpenseStore } from '@/stores/useExpenseStore';
import { DeleteIcon, EditIcon } from '@/components/common/icons';

const ExpenseDetails = () => {
  const setExpenseDialog = useExpenseStore(
    (state) => state.setExpenseDialogState
  );
  const setExpenseDrawer = useExpenseStore(
    (state) => state.setExpenseDrawerState
  );

  const handleEdit = () => {
    setExpenseDialog({ open: false });
    setExpenseDrawer({ open: true, header: ExpenseEnum.EDIT_EXPENSE });
  };

  return (
    <div className="relative">
      <div className="px-space16 py-space16">
        <ul className="space-y-space12">
          <li className="space-y-space6">
            <Text title="Category" variant="secondary" className="text-sm" />
            <div className="flex gap-space8">
              <Image
                width={24}
                height={24}
                className="object-contain"
                alt="expense category image"
                src="/images/add_user.svg"
              />
              <Text title="Category Name" />
            </div>
          </li>

          <li className="space-y-space6">
            <Text title="Amount" variant="secondary" className="text-sm" />
            <Text title="৳ 1200" />
          </li>

          <li className="space-y-space6">
            <Text title="Employee" variant="secondary" className="text-sm" />
            <div className="flex gap-space8">
              <Image
                width={24}
                height={24}
                className="object-contain"
                alt="employee image"
                src="/images/add_user.svg"
              />
              <Text title="employee Name" />
            </div>
          </li>

          <li className="space-y-space6">
            <Text
              title="Date and Time"
              variant="secondary"
              className="text-sm"
            />
            <Text title="Dec 30, 09:42 PM" />
          </li>
          <li className="space-y-space6">
            <Text title="Notes" variant="secondary" className="text-sm" />
            <Text title="This is a sample note for sample things" />
          </li>

          <li className="space-y-space6">
            <Text title="Images" variant="secondary" className="text-sm" />
            <div className="flex gap-4">
              <div className="shadow-md bg-primary-5 rounded-md h-[6.4rem] w-[6.4rem]">
                <Image
                  src="/images/add_user.svg"
                  width={64}
                  height={64}
                  alt="note image"
                  className=" object-cover rounded-lg"
                />
              </div>
            </div>
          </li>
        </ul>
      </div>

      <DialogFooter className="flex justify-end gap-space16">
        <Button
          variant={'danger'}
          onClick={() =>
            setExpenseDialog({
              open: true,
              header: ExpenseEnum.DELETE_TRANSACTION,
            })
          }
        >
          <DeleteIcon color="#fff" />
          Delete
        </Button>
        <Button onClick={handleEdit}>
          <EditIcon />
          Edit
        </Button>
      </DialogFooter>
    </div>
  );
};

export default ExpenseDetails;

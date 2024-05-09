'use client';
import React from 'react';
import Image from 'next/image';
import { ExpenseEnum } from '@/enum/expense';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { DialogFooter } from '@/components/common/Dialog';
import { useExpenseStore } from '@/stores/useExpenseStore';
import { DeleteIcon, EditIcon } from '@/components/common/icons';
import { IExpense } from '@/types/expense';

const ExpenseDetails = ({ expense }: { expense: IExpense }) => {
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
                src={expense?.image ?? ''}
              />
              <Text title={expense?.type} />
            </div>
          </li>

          <li className="space-y-space6">
            <Text title="Amount" variant="secondary" className="text-sm" />
            <Text title={`"৳ ${expense?.amount}"`} />
          </li>

          <li className="space-y-space6">
            <Text title="Employee" variant="secondary" className="text-sm" />
            <div className="flex gap-space8">
              {/* <Image
                width={24}
                height={24}
                className="object-contain"
                alt="employee image"
                src="/images/add_user.svg"
              /> */}
              <Text title={expense?.contact_name ?? 'N/A'} />
            </div>
          </li>

          <li className="space-y-space6">
            <Text
              title="Date and Time"
              variant="secondary"
              className="text-sm"
            />
            <Text title={expense?.created_at} />
          </li>
          <li className="space-y-space6">
            <Text title="Notes" variant="secondary" className="text-sm" />
            <Text title={expense?.details ?? ''} />
          </li>

          {expense?.image ? (
            <li className="space-y-space6">
              <Text title="Images" variant="secondary" className="text-sm" />
              <div className="flex gap-4">
                <div className="shadow-md bg-primary-5 rounded-md h-[6.4rem] w-[6.4rem]">
                  <Image
                    src={expense?.image ?? ''}
                    width={64}
                    height={64}
                    alt="ni"
                    className=" object-cover rounded-lg"
                  />
                </div>
              </div>
            </li>
          ) : null}
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

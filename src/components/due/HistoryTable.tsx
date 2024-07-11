'use client';
import React from 'react';
import { Text } from '@/components/common/text';
import { IDueItemsResponse } from '@/types/due/dueResponse';
import FallBackImage from '@/components/common/FallBackImage';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useDueStore } from '@/stores/useDueStore';
import { DueEnum } from '@/enum/due';
import { toast } from 'sonner';

const HistoryTable = ({ dueList }: { dueList: IDueItemsResponse[] }) => {
  const handleDrawerOpen = useDueStore((state) => state.setDrawerState);
  const setDueItem = useDueStore((state) => state.setDueItem);

  const handleEdit = (dueItem: IDueItemsResponse) => {
    const isPurchaseUniqueId = dueItem.purchase_unique_id
      ? dueItem.purchase_unique_id === 'null'
        ? true
        : false
      : true;

    const isTransactionUniqueId = dueItem.transaction_unique_id
      ? dueItem.transaction_unique_id === 'null'
        ? true
        : false
      : true;

    if (isPurchaseUniqueId && isTransactionUniqueId) {
      setDueItem(dueItem);
      handleDrawerOpen({ open: true, header: DueEnum.EDIT_DUE });
    } else {
      dueItem.contact_type === 'CUSTOMER'
        ? toast.message('Please go to Sell List To Edit This Item')
        : toast.message('Please go to Purchase List To Edit This Item');
    }
  };

  return (
    <ScrollArea className="pb-space8">
      <Table wrapperClass="rounded-md border border-color min-w-[80rem]">
        <TableHeader>
          <TableRow>
            <TableHead className="">Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Person</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-center">Date & Time</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {dueList?.map((item, i) => (
            <TableRow
              className="cursor-pointer"
              key={item.id}
              onClick={() => handleEdit(item)}
            >
              <TableCell>
                <div className="flex items-center gap-space8">
                  <FallBackImage
                    src={item.image ?? ''}
                    fallback={item.contact_name.charAt(0)}
                  />

                  <Text title={item.contact_name} className="text-sm" />
                </div>
              </TableCell>
              <TableCell>{item.contact_mobile}</TableCell>
              <TableCell>{item.contact_type}</TableCell>
              <TableCell>৳ {Math.abs(item.amount)}</TableCell>
              <TableCell className="text-center">
                <article className="flex items-center gap-space16 justify-center">
                  <Text
                    title={item.amount <= 0 ? 'Received' : 'Given'}
                    className={`!text-white dark:!text-white max-w-max px-space12 py-space4 rounded-full text-sm uppercase dark:bg-primary-80 ${
                      item.amount <= 0 ? 'bg-success-100' : 'bg-error-100'
                    }`}
                  />
                  {item.created_at}
                </article>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            {/* <TableCell colSpan={5} className="text-center">
              Showing 10 of 100 Transactions
            </TableCell> */}
          </TableRow>
        </TableFooter>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default HistoryTable;

'use client';
import React from 'react';
import { SellEnum } from '@/enum/sell';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { useSellStore } from '@/stores/useSellStore';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { DeleteIcon, EditIcon, MoreVertIcon } from '@/components/common/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ICommonGetResponse } from '@/types/common';
import { IPurchaseHistoryResponse } from '@/types/purchase';
import { usePathname, useRouter } from 'next/navigation';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import Pagination from '@/components/common/CustomPagination';

const HistoryTable = ({
  transactions,
}: {
  transactions?: IPurchaseHistoryResponse[];
}) => {
  const handleDialogOpen = useSellStore((state) => state.setSellDialogState);
  const handleDrawerOpen = useSellStore((state) => state.setSellDrawerState);
  const setSellDetails = useSellStore((state) => state.setSellDetails);

  const pathname = usePathname();
  const router = useRouter();
  const { setQueryString } = useCreateQueryString();
  const setCurrentPurchase = useSellStore((state) => state.setCurrentSell);
  const handleRowClick = (row: IPurchaseHistoryResponse) => {
    handleDrawerOpen({ open: true, header: SellEnum.TRANSACTION_DETAILS });
    console.log(row);
    setCurrentPurchase(row);
  };

  const handleEditClick = (item: any) => {
    if (item.transactionType === 'quick sell') {
      handleDrawerOpen({ open: true, header: SellEnum.QUICK_SELL_EDIT });
    } else {
      handleDrawerOpen({ open: true, header: SellEnum.TRANSACTION_EDIT });
      setCurrentPurchase(item);
    }
  };

  const transactionTypeTextVariant = (
    type: string
  ): 'warning' | 'success' | 'error' => {
    if (type === 'quick sell') {
      return 'warning';
    } else if (type !== 'UNPAID') {
      return 'success';
    } else {
      return 'error';
    }
  };
  const transactionTypeTextBG = (type: string): string => {
    if (type === 'quick sell') {
      return 'bg-warning-20';
    } else if (type !== 'UNPAID') {
      return 'bg-success-20';
    } else {
      return 'bg-error-20';
    }
  };

  return (
    <ScrollArea className="pb-space8">
      <Table wrapperClass="rounded-md border border-color">
        <TableHeader>
          <TableRow>
            <TableHead className="">#</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Transaction Type</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions?.map((transaction, i) => (
            <TableRow
              key={transaction.id}
              onClick={() => handleRowClick(transaction)}
            >
              <TableCell>{transaction.id}</TableCell>
              <TableCell>{transaction.total_item}</TableCell>
              <TableCell>{transaction.supplier_name}</TableCell>
              <TableCell>{transaction.total_price}</TableCell>
              <TableCell>{transaction.created_at}</TableCell>
              <TableCell>
                <Text
                  title={transaction.payment_status}
                  variant={transactionTypeTextVariant(
                    transaction.payment_status
                  )}
                  className={`max-w-max px-space16 py-space8 rounded-md uppercase font-medium dark:bg-primary-80 ${transactionTypeTextBG(transaction.payment_status)}`}
                />
              </TableCell>
              <TableCell className={`text-right`}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size={'icon'}
                      variant={'transparent'}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <MoreVertIcon />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    side="bottom"
                    className="w-56 "
                  >
                    {/* <DropdownMenuItem asChild>
                      <Button
                        size={'sm'}
                        variant={'transparent'}
                        className="w-full justify-start"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(transaction);
                        }}
                      >
                        <EditIcon />
                        Edit
                      </Button>
                    </DropdownMenuItem> */}
                    <DropdownMenuItem asChild>
                      <Button
                        size={'sm'}
                        variant={'transparent'}
                        className="w-full justify-start text-error-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDialogOpen({
                            open: true,
                            header: SellEnum.TRANSACTION_DELETE,
                          });
                          setCurrentPurchase(transaction);
                        }}
                      >
                        <DeleteIcon />
                        Delete
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              Showing 10 of 100 Transactions
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <ScrollBar orientation="horizontal" />
      {/* <Pagination
        pageCount={
          transactions?.length === 0
            ? transactions?.last_page
            : transactions
              ? Math.ceil(
                  transactions?.total ?? 0 / transactions?.per_page ?? 0
                )
              : 0
        }
        currentPage={transactions?.current_page ?? 0}
        lastPage={transactions?.last_page ?? 0}
        onChanage={(page) => {
          router.push(`${pathname}?${setQueryString('page', page)}`);
        }}
      /> */}
    </ScrollArea>
  );
};

export default HistoryTable;

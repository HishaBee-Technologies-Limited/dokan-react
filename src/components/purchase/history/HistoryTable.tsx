'use client';
import React from 'react';
import { SellEnum } from '@/enum/sell';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { usePurchaseStore } from '@/stores/usePurchase';
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

const invoices = [
  {
    id: '#9875834',
    item: '2 items',
    contact: 'Md. Ariful Islam',
    amount: '৳200',
    date: '23 May 2023',
    transactionType: 'buy',
  },
  {
    id: '#9895834',
    item: '2 items',
    contact: 'Md. Ariful Islam',
    amount: '৳200',
    date: '23 May 2023',
    transactionType: 'due',
  },
  {
    id: '#9895894',
    item: '2 items',
    contact: 'Md. Ariful Islam',
    amount: '৳200',
    date: '23 May 2023',
    transactionType: 'buy',
  },
];

const HistoryTable = () => {
  const handleDialogOpen = usePurchaseStore((state) => state.setDialogState);
  const handleDrawerOpen = usePurchaseStore((state) => state.setDrawerState);

  const handleRowClick = (row: any) => {
    handleDrawerOpen({ open: true, header: SellEnum.TRANSACTION_DETAILS });
  };

  const handleEditClick = (item: any) => {
    handleDrawerOpen({ open: true, header: SellEnum.TRANSACTION_EDIT });
  };

  const transactionTypeTextVariant = (type: string): 'success' | 'error' => {
    if (type === 'buy') {
      return 'success';
    } else {
      return 'error';
    }
  };
  const transactionTypeTextBG = (type: string): string => {
    if (type === 'buy') {
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
          {invoices.map((item, i) => (
            <TableRow key={item.id} onClick={() => handleRowClick(item)}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.item}</TableCell>
              <TableCell>{item.contact}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>
                <Text
                  title={item.transactionType}
                  variant={transactionTypeTextVariant(item.transactionType)}
                  className={`max-w-max px-space16 py-space8 rounded-md uppercase font-medium dark:bg-primary-80 ${transactionTypeTextBG(item.transactionType)}`}
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
                    <DropdownMenuItem asChild>
                      <Button
                        size={'sm'}
                        variant={'transparent'}
                        className="w-full justify-start"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(item);
                        }}
                      >
                        <EditIcon />
                        Edit
                      </Button>
                    </DropdownMenuItem>
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
    </ScrollArea>
  );
};

export default HistoryTable;

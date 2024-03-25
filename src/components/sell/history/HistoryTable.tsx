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

const invoices = [
  {
    id: '#9875834',
    item: '2 items',
    contact: 'Md. Ariful Islam',
    amount: '৳200',
    date: '23 May 2023',
    transactionType: 'quick sell',
  },
  {
    id: '#9895834',
    item: '2 items',
    contact: 'Md. Ariful Islam',
    amount: '৳200',
    date: '23 May 2023',
    transactionType: 'sell',
  },
  {
    id: '#9895894',
    item: '2 items',
    contact: 'Md. Ariful Islam',
    amount: '৳200',
    date: '23 May 2023',
    transactionType: 'due',
  },
];

const HistoryTable = () => {
  const handleDialogOpen = useSellStore((state) => state.setSellDialogState);
  const handleDrawerOpen = useSellStore((state) => state.setSellDrawerState);
  const setSellDetails = useSellStore((state) => state.setSellDetails);

  const handleRowClick = (row: any) => {
    setSellDetails(row);
    handleDrawerOpen({ open: true, header: SellEnum.TRANSACTION_DETAILS });
  };

  const handleEditClick = (item: any) => {
    if (item.transactionType === 'quick sell') {
      handleDrawerOpen({ open: true, header: SellEnum.QUICK_SELL_EDIT });
    } else {
      handleDrawerOpen({ open: true, header: SellEnum.TRANSACTION_EDIT });
    }
  };

  const transactionTypeTextVariant = (
    type: string
  ): 'warning' | 'success' | 'error' => {
    if (type === 'quick sell') {
      return 'warning';
    } else if (type === 'sell') {
      return 'success';
    } else {
      return 'error';
    }
  };
  const transactionTypeTextBG = (type: string): string => {
    if (type === 'quick sell') {
      return 'bg-warning-20';
    } else if (type === 'sell') {
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

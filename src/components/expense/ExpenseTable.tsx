'use client';
import React from 'react';
import { ExpenseEnum } from '@/enum/expense';
import { Button } from '@/components/ui/button';
import { useExpenseStore } from '@/stores/useExpenseStore';
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
    category: 'গাড়ি/ভ্যান ভাড়া',
    amount: '৳200',
    date: 'Dec 30, 09:42 PM',
    note: 'this is demo notes',
  },
  {
    category: 'সকালের নাস্তা',
    amount: '৳2000000',
    date: 'Dec 30, 09:42 PM',
    note: 'this is demo notes',
  },
  {
    category: 'গাড়ি/ভ্যান ভাড়া',
    amount: '৳2000000',
    date: 'Dec 30, 09:42 PM',
    note: 'this is demo notes',
  },
  {
    category: 'সকালের নাস্তা',
    amount: '৳2000000',
    date: 'Dec 30, 09:42 PM',
  },
  {
    category: 'গাড়ি/ভ্যান ভাড়া',
    amount: '৳2000000',
    date: 'Dec 30, 09:42 PM',
    note: 'this is demo notes',
  },
  {
    category: 'সকালের নাস্তা',
    amount: '৳2000000',
    date: 'Dec 30, 09:42 PM',
    note: 'this is demo notes',
  },
];

const ExpenseTable = () => {
  const setExpenseDialog = useExpenseStore(
    (state) => state.setExpenseDialogState
  );
  const setExpenseDrawer = useExpenseStore(
    (state) => state.setExpenseDrawerState
  );

  const handleRowClick = () => {
    setExpenseDialog({ open: true, header: ExpenseEnum.EXPENSE_DETAILS });
  };

  return (
    <ScrollArea className="pb-space8">
      <Table wrapperClass="rounded-md border border-color">
        <TableHeader>
          <TableRow>
            <TableHead className="">Transaction Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {invoices.map((invoice, i) => (
            <TableRow key={i} onClick={() => handleRowClick()}>
              <TableCell>
                <div className="max-w-max py-space6 pl-space6 pr-space8 rounded-full flex items-center bg-white dark:bg-primary-90 border border-color">
                  <div className="w-space24 h-space24 bg-primary-40 rounded-full mr-space8"></div>
                  <span>{invoice.category}</span>
                </div>
              </TableCell>
              <TableCell>{invoice.amount}</TableCell>
              <TableCell>{invoice.date}</TableCell>
              <TableCell>{invoice.note}</TableCell>
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
                          setExpenseDrawer({
                            open: true,
                            header: ExpenseEnum.EDIT_EXPENSE,
                          });
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
                          setExpenseDialog({
                            open: true,
                            header: ExpenseEnum.DELETE_TRANSACTION,
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
            <TableCell colSpan={6} className="text-center">
              Showing 10 of 100 Transactions
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default ExpenseTable;

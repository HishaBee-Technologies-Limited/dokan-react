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
import { ICommonGetResponse } from '@/types/common';
import { IExpense } from '@/types/expense';
import Pagination from '@/components/common/CustomPagination';
import { usePathname, useRouter } from 'next/navigation';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';

const ExpenseTable = ({ expenseList }: { expenseList: IExpense[] }) => {
  const setExpenseDialog = useExpenseStore(
    (state) => state.setExpenseDialogState
  );
  const setExpenseDrawer = useExpenseStore(
    (state) => state.setExpenseDrawerState
  );
  const pathname = usePathname();
  const router = useRouter();
  const { setQueryString } = useCreateQueryString();

  const handleRowClick = (expense: IExpense) => {
    setExpenseDialog({ open: true, header: ExpenseEnum.EXPENSE_DETAILS });
    router.push(`${pathname}?${setQueryString('expense', expense?.unique_id)}`);
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
          {expenseList?.map((expense, i) => (
            <TableRow key={i} onClick={() => handleRowClick(expense)}>
              <TableCell>
                <div className="max-w-max py-space6 pl-space6 pr-space8 rounded-full flex items-center bg-white dark:bg-primary-90 border border-color">
                  <div className="w-space24 h-space24 bg-primary-40 rounded-full mr-space8"></div>
                  <span>{expense.type}</span>
                </div>
              </TableCell>
              <TableCell>{expense.amount}</TableCell>
              <TableCell>{expense.created_at}</TableCell>
              <TableCell>{expense.details}</TableCell>
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
      {/* <Pagination
        pageCount={
          expenseList.data.length === 0
            ? expenseList.last_page
            : Math.ceil(expenseList.total ?? 0 / expenseList.per_page ?? 0)
        }
        currentPage={expenseList.current_page ?? 0}
        lastPage={expenseList.last_page ?? 0}
        onChanage={(page) => {
          router.push(`${pathname}?${setQueryString('page', page)}`);
        }}
      /> */}
    </ScrollArea>
  );
};

export default ExpenseTable;

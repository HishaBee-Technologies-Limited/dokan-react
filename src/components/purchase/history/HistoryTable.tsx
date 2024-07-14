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
import { PurchaseEnum } from '@/enum/purchase';
import { useProductTable } from '@/hooks/useProductTable';
import Pagination from '@/components/common/CustomPagination';
import { IPurchaseHistoryResponse } from '@/types/purchase';
import { ICommonGetResponse } from '@/types/common';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import { usePathname, useRouter } from 'next/navigation';
import { generateQueryString } from '@/lib/queryString';
import { usePurchase } from '@/stores/usePurchaseStore';
import NoDataCard from '@/components/common/no-data-card';
import { cn } from '@/lib/utils';

const HistoryTable = ({
  purchaseHistory,
}: {
  purchaseHistory: ICommonGetResponse<IPurchaseHistoryResponse>;
}) => {
  const handleDialogOpen = usePurchaseStore((state) => state.setDialogState);
  const handleDrawerOpen = usePurchaseStore((state) => state.setDrawerState);
  const { updateQueryParams, queryParams } = useProductTable();
  const pathname = usePathname();
  const router = useRouter();
  const { setQueryString } = useCreateQueryString();
  const setCurrentPurchase = usePurchase((state) => state.setCurrentPurchase);

  const handleRowClick = (row: IPurchaseHistoryResponse) => {
    handleDrawerOpen({ open: true, header: PurchaseEnum.TRANSACTION_DETAILS });
    setCurrentPurchase(row);
  };

  // const handleEditClick = (item: any) => {
  //   handleDrawerOpen({ open: true, header: PurchaseEnum.TRANSACTION_EDIT });
  //   setCurrentPurchase(item);
  // };

  const transactionTypeTextVariant = (type: string): 'success' | 'error' => {
    if (type === 'UNPAID') {
      return 'error';
    } else {
      return 'success';
    }
  };
  const transactionTypeTextBG = (type: string): string => {
    if (type === 'UNPAID') {
      return 'bg-error-20';
    } else {
      return 'bg-success-20 ';
    }
  };

  console.log(purchaseHistory);

  return (
    <ScrollArea className="pb-space8">
      {purchaseHistory?.data.length === 0 ? (
        <NoDataCard />
      ) : (
        <Table wrapperClass="rounded-md border border-color">
          <TableHeader>
            <TableRow>
              <TableHead className="">#</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {purchaseHistory?.data.map((purchase) => (
              <TableRow
                key={purchase.id}
                onClick={() => handleRowClick(purchase)}
              >
                <TableCell>{purchase.id}</TableCell>
                <TableCell>{purchase.total_item}</TableCell>
                <TableCell
                  className={cn(
                    purchase.supplier_name?.includes('ENCRYPTED') && 'blur-sm'
                  )}
                >
                  {purchase.supplier_name}
                </TableCell>
                <TableCell>{purchase.total_price}</TableCell>
                <TableCell>{purchase.updated_at}</TableCell>
                <TableCell>
                  <Text
                    title={purchase.payment_status}
                    variant={transactionTypeTextVariant(
                      purchase.payment_status
                    )}
                    className={`max-w-max px-space16 py-space8 rounded-md uppercase font-medium dark:bg-primary-80 ${transactionTypeTextBG(purchase.payment_status)}`}
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
                          handleEditClick(purchase);
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
                              header: PurchaseEnum.TRANSACTION_DELETE,
                            });
                            setCurrentPurchase(purchase);
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

          {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              Showing 10 of 100 Transactions
            </TableCell>
          </TableRow>
        </TableFooter> */}
        </Table>
      )}
      <ScrollBar orientation="horizontal" />
      {purchaseHistory?.data.length !== 0 && (
        <Pagination
          pageCount={
            purchaseHistory?.data.length === 0
              ? purchaseHistory.last_page
              : Math.ceil(purchaseHistory.total / purchaseHistory.per_page)
          }
          currentPage={purchaseHistory.current_page ?? 0}
          lastPage={purchaseHistory.last_page ?? 0}
          onChanage={(page) => {
            router.push(`${pathname}?${setQueryString('page', page)}`);
          }}
        />
      )}
    </ScrollArea>
  );
};

export default HistoryTable;

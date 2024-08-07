import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import NoDataCard from '@/components/common/no-data-card';
import React from 'react';
import Card from '@/components/common/Card';
import { Text } from '@/components/common/text';
import { formatDate } from '@/lib/date';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { PAYMENT_STATUS } from '@/lib/constants/common';
import { ITransactionReportsResponse } from '@/types/dashboard';

type TransactionReportTablePropsType = {
  transactionReport: ITransactionReportsResponse;
};

export default async function TransactionReportTable({
  transactionReport,
}: TransactionReportTablePropsType) {
  return (
    <ScrollArea className="pb-space8">
      {Array.isArray(transactionReport?.items) &&
      transactionReport?.items?.length === 0 ? (
        <NoDataCard />
      ) : (
        <>
          {Object.keys(transactionReport?.items).map((date) => (
            <Card className="my-3 p-4" key={date}>
              <div className="flex items-center justify-between">
                <Text variant="blue" className="font-medium text-lg">
                  {formatDate(date)}
                </Text>
                <Text variant="blue" className="font-medium text-lg">
                  Total Sell ৳ {transactionReport?.sum[date]}
                </Text>
              </div>
              <div>
                {transactionReport?.items[date]?.map((transaction) => (
                  <Card
                    className="flex items-center justify-between my-3 p-4 rounded-md border border-primary-10 dark:border-primary-80 dark:bg-primary-100"
                    key={transaction.id}
                  >
                    <div>
                      <Text variant="muted">#{transaction.id}</Text>
                      <Text variant="primary" className="font-medium text-md">
                        Total Price: ৳ {transaction.total_price}
                      </Text>
                      <Text variant="primary" className="font-medium text-md">
                        Total Item: {transaction.total_item}
                      </Text>
                      <Text variant="muted">
                        {format(
                          new Date(transaction.created_at),
                          'dd MMM yyyy, HH:mm'
                        )}
                      </Text>
                    </div>

                    <div className="">
                      <Text
                        variant="primary"
                        className="font-medium text-md pb-3"
                      >
                        {transaction.customer_name}
                      </Text>

                      <Button
                        variant={
                          transaction?.transaction_type === 'QUICK_SELL'
                            ? 'success'
                            : transaction?.payment_status ===
                                PAYMENT_STATUS.UNPAID
                              ? 'danger'
                              : 'success'
                        }
                        size="sm"
                        className="text-white text-lg focus:outline-none"
                      >
                        {transaction?.transaction_type === 'QUICK_SELL'
                          ? 'Quick Sell'
                          : transaction.payment_status}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          ))}
          <ScrollBar orientation="horizontal" />
        </>
      )}
    </ScrollArea>
  );
}

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import NoDataCard from '@/components/common/no-data-card';
import React from 'react';
import Card from '@/components/common/Card';
import { Text } from '@/components/common/text';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/date';
import { format } from 'date-fns';
import { IPurchaseReportResponse } from '@/types/dashboard';

type PurchaseReportTablePropsType = {
  purchaseReport: IPurchaseReportResponse;
};

export default async function PurchaseReportTable({
  purchaseReport,
}: PurchaseReportTablePropsType) {
  return (
    <ScrollArea className="pb-space8">
      {Array.isArray(purchaseReport?.items) &&
      purchaseReport?.items?.length === 0 ? (
        <NoDataCard />
      ) : (
        <>
          {Object.keys(purchaseReport?.items).map((date) => (
            <Card className="my-3 p-4" key={date}>
              <div className="flex items-center justify-between">
                <Text variant="blue" className="font-medium text-lg">
                  {formatDate(date)}
                </Text>
                <Text variant="blue" className="font-medium text-lg">
                  Total Purchase ৳ {purchaseReport?.sum[date]}
                </Text>
              </div>
              <div>
                {purchaseReport?.items[date]?.map((transaction) => (
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

                    <Button
                      variant={
                        transaction?.payment_status === 'PAID'
                          ? 'success'
                          : 'danger'
                      }
                      size="sm"
                      className="text-white text-lg focus:outline-none"
                    >
                      {transaction?.payment_status}
                    </Button>
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

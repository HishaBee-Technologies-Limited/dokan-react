import { Text } from '@/components/common/text';
import Card from '@/components/common/Card';
import React from 'react';

type SalesItemBalanceType = {
  value: number;
};

export default function SalesItemBalance({ value }: SalesItemBalanceType) {
  return (
    <Card className="flex justify-between items-center gap-10 p-4">
      <div>
        <Text className="text-md font-medium">Total Balance</Text>
        <Text variant="muted" className={`text-sm`}>
          (Total Sell + Customer Due received + other Income) - (Total Purchase
          + Supplier Due Given + other Expense)
        </Text>
      </div>

      <Text variant="success" className="text-2xl font-semibold">
        ৳ {value}
      </Text>
    </Card>
  );
}

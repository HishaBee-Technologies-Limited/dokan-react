import { Text } from '@/components/common/text';
import Card from '@/components/common/Card';
import React from 'react';

export default function OtherExpense() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Text variant="muted" className="flex-none">
          Other Expense
        </Text>
        <div className="w-full h-[1px] bg-primary-10"></div>
      </div>

      <Card className="flex flex-col gap-4 p-4 bg-white">
        <div className="flex justify-between items-center gap-4">
          <Text variant="muted" className="uppercase">
            Purchase
          </Text>
          <Text variant="primary" className="font-medium text-lg">
            (-)৳ 90,0000
          </Text>
        </div>

        <div className="flex justify-between items-center gap-4">
          <Text variant="muted" className="uppercase">
            Salary
          </Text>
          <Text variant="primary" className="text-lg">
            (-)৳ 90,0000
          </Text>
        </div>

        <div className="w-full bg-primary-10 h-[1px]"></div>

        <div className="flex justify-between items-center gap-4">
          <Text variant="primary" className="font-medium text-lg">
            Total Expense (Other)
          </Text>
          <Text variant="error" className="text-lg">
            (+)৳ 90,0000
          </Text>
        </div>
      </Card>
    </div>
  );
}

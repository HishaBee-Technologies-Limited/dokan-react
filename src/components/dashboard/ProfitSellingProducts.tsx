import { Text } from '@/components/common/text';
import Card from '@/components/common/Card';
import React from 'react';

type ProfitSellingProducts = {
  value: number;
};

export default function ProfitSellingProducts({
  value,
}: ProfitSellingProducts) {
  return (
    <Card className="flex justify-between items-center gap-10 p-4">
      <div>
        <Text className="text-md font-medium">
          Profit from Selling Products
        </Text>
        <Text variant="muted" className={`text-sm`}>
          (sold products Price - Cost)
        </Text>
      </div>

      <Text variant="primary" className="text-2xl font-semibold">
        ৳ {value}
      </Text>
    </Card>
  );
}

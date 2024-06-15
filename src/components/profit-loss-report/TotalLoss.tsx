import { Text } from '@/components/common/text';
import Card from '@/components/common/Card';
import React from 'react';

export default function TotalLoss() {
  return (
    <Card className="flex flex-col gap-4 p-4 bg-white">
      <div className="flex justify-between items-center gap-4">
        <Text variant="error" className="uppercase">
          Purchase
        </Text>
        <Text variant="error" className="font-medium text-lg">
          (-)৳ 90,0000
        </Text>
      </div>

      <Text variant="muted">
        (Profit from sale + other income) - Total cost
      </Text>
    </Card>
  );
}

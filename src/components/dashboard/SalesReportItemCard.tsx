import { Text } from '@/components/common/text';
import Card from '@/components/common/Card';
import React from 'react';

type SalesReportItemCardType = {
  title: string;
  salesType?: 'CUSTOMER' | 'SUPPLIER';
  value: number;
  isDue?: boolean;
  isSellable?: boolean;
};

export default function SalesReportItemCard({
  salesType,
  isDue,
  title,
  value,
  isSellable,
}: SalesReportItemCardType) {
  return (
    <Card className="flex justify-between items-center gap-10 p-4">
      <div>
        <Text className="text-md font-medium">{title}</Text>
        <Text
          variant="muted"
          className={`${isDue ? 'visible' : 'invisible'} text-sm`}
        >
          (Without {salesType === 'CUSTOMER' ? 'Customer' : 'Supplier'} Due)
        </Text>
      </div>

      <Text
        variant={isSellable ? 'success' : 'error'}
        className="text-2xl font-semibold"
      >
        ৳ {value}
      </Text>
    </Card>
  );
}

import { Text } from '@/components/common/text';
import Card from '@/components/common/Card';
import React from 'react';
import SalesReportItemCard from './SalesReportItemCard';
import SalesItemBalance from './SalesItemBalance';
import ProfitSellingProducts from './ProfitSellingProducts';

export default function SalesReport() {
  return (
    <div className="flex flex-col gap-4">
      <Text className="text-lg font-semibold my-5">General Sales Report</Text>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SalesReportItemCard
          title="Sell with due"
          value={0}
          salesType="CUSTOMER"
          isDue
          isSellable
        />
        <SalesReportItemCard
          title="Customer Due Received"
          value={0}
          isSellable
        />
        <SalesReportItemCard title="Other icome" value={1000} isSellable />
        <SalesReportItemCard
          title="Sell with due"
          value={100}
          salesType="CUSTOMER"
          isDue
        />
        <SalesReportItemCard title="Sell with due" value={100} />
        <SalesReportItemCard title="Sell with due" value={100} />
      </div>

      <div className="border border-primary-70 dark:border-secondary-10 my-4"></div>

      <div className="flex flex-col justify-between md:flex-row-reverse gap-6">
        <div className="w-full md:w-1/2">
          <SalesItemBalance value={850} />
        </div>
        <div className="w-full md:w-1/2">
          <ProfitSellingProducts value={100} />
        </div>
      </div>
    </div>
  );
}

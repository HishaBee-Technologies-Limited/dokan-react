import { Text } from '@/components/common/text';
import React from 'react';
import AllBusinessReportItemLinkCard from '@/components/business-overview/AllBusinessReportItemLinkCard';

export default function AllBusinessReportsCards() {
  return (
    <div>
      <Text className="text-lg font-semibold my-5">All Business Reports</Text>

      {/*Cards*/}
      <div className="grid grid-cols-3 gap-6">
        <AllBusinessReportItemLinkCard
          imageURL="/images/features/due.svg"
          linkURL="reports/transaction"
          label="Transaction Report"
        />
        <AllBusinessReportItemLinkCard
          imageURL="/images/features/due.svg"
          linkURL="reports/purchase"
          label="Purchase Report"
        />
        <AllBusinessReportItemLinkCard
          imageURL="/images/features/due.svg"
          linkURL="reports/stock"
          label="Stock Report"
        />

        <AllBusinessReportItemLinkCard
          imageURL="/images/features/due.svg"
          linkURL="reports/product"
          label="Product Report"
        />
        <AllBusinessReportItemLinkCard
          imageURL="/images/features/due.svg"
          linkURL="/reports/best/customer"
          label="Best Customer"
        />
        <AllBusinessReportItemLinkCard
          imageURL="/images/features/due.svg"
          linkURL="/reports/best/employee"
          label="Best Employee"
        />

        <AllBusinessReportItemLinkCard
          imageURL="/images/features/due.svg"
          linkURL="reports/profit-loss"
          label="Profit Loss Report"
        />
        <AllBusinessReportItemLinkCard
          imageURL="/images/features/due.svg"
          linkURL="reports/expense"
          label="Expense Report"
        />
        <AllBusinessReportItemLinkCard
          imageURL="/images/features/due.svg"
          linkURL="reports/supplier"
          label="Supplier Report"
        />
        <AllBusinessReportItemLinkCard
          imageURL="/images/features/due.svg"
          linkURL="reports/income"
          label="Income Report"
        />
      </div>
    </div>
  );
}

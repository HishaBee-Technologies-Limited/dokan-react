import { Text } from '@/components/common/text';
import React from 'react';
import AllBusinessReportItemLinkCard from './AllBusinessReportItemLinkCard';

export default function AllBusinessReportsCards() {
  return (
    <div className=" ">
      <Text
        className="text-lg font-semibold my-5"
        title="All Business Reports"
      ></Text>

      {/*Cards*/}
      <div className="px-20">
        <div className="grid grid-cols-5 gap-6">
          <AllBusinessReportItemLinkCard
            imageURL="/images/features/due.svg"
            linkURL="home/transaction"
            label="Transaction Report"
          />
          <AllBusinessReportItemLinkCard
            imageURL="/images/features/due.svg"
            linkURL="home/purchase"
            label="Purchase Report"
          />
          <AllBusinessReportItemLinkCard
            imageURL="/images/features/due.svg"
            linkURL="home/stock"
            label="Stock Report"
          />

          <AllBusinessReportItemLinkCard
            imageURL="/images/features/due.svg"
            linkURL="home/product"
            label="Product Report"
          />
          <AllBusinessReportItemLinkCard
            imageURL="/images/features/due.svg"
            linkURL="/home/customer"
            label="Best Customer"
          />
          <AllBusinessReportItemLinkCard
            imageURL="/images/features/due.svg"
            linkURL="/home/employee"
            label="Best Employee"
          />

          <AllBusinessReportItemLinkCard
            imageURL="/images/features/due.svg"
            linkURL="home/profit-loss"
            label="Profit Loss Report"
          />
          <AllBusinessReportItemLinkCard
            imageURL="/images/features/due.svg"
            linkURL="home/expense"
            label="Expense Report"
          />
          <AllBusinessReportItemLinkCard
            imageURL="/images/features/due.svg"
            linkURL="home/supplier"
            label="Supplier Report"
          />
          <AllBusinessReportItemLinkCard
            imageURL="/images/features/due.svg"
            linkURL="home/income"
            label="Income Report"
          />
        </div>
      </div>
    </div>
  );
}

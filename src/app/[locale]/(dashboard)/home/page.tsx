import React from 'react';
import PageHeader from '@/components/dashboard/Header';
import AllBusinessReportsCards from '@/components/dashboard/AllBusinessReportsCards';
import TransactionCard from '@/components/dashboard/TransactionCard';
import BODateRangePicker from '@/components/dashboard/DateRange';
import SalesReport from '@/components/dashboard/SalesReport';
import TotalDueCalculation from '@/components/dashboard/DueCalculation';

const HomePage = async () => {
  return (
    <>
      <div className="space-y-space16 h-full w-full">
        <PageHeader />

        <div className="flex justify-between items-center flex-wrap gap-6">
          <div className="flex gap-6 w-full lg:w-1/2">
            <TransactionCard
              title="Other Income"
              value={1000}
              classes="text-success-80"
            />
            <TransactionCard
              title="Other Expense"
              value={1000}
              classes="text-red-600"
            />
          </div>

          <div className="flex flex-wrap gap-space8 sm:gap-space12">
            <BODateRangePicker />
          </div>
        </div>

        <SalesReport />
        <TotalDueCalculation />
        <AllBusinessReportsCards />
      </div>
      {/*Dialog*/}
    </>
  );
};

export default HomePage;

import React from 'react';
// import BOOverviewTransactionCard from '@/components/business-overview/BOOverviewTransactionCard';
// import BODateRangePicker from '@/components/business-overview/BODateRangePicker';
// import GeneralSalesReport from '@/components/business-overview/GeneralSalesReport';
import PageHeader from '@/components/dashboard/Header';
import AllBusinessReportsCards from '@/components/dashboard/AllBusinessReportsCards';
// import TotalDueCalculation from '@/components/business-overview/TotalDueCalculation';

const HomePage = async () => {
  return (
    <>
      <div className="space-y-space16 h-full w-full">
        <PageHeader />

        {/* <div className="flex justify-between items-center flex-wrap gap-6">
          <div className="flex gap-6 w-full lg:w-1/2">
            <BOOverviewTransactionCard
              title="Other Income"
              value={1000}
              classes="text-success-80"
            />
            <BOOverviewTransactionCard
              title="Other Expense"
              value={1000}
              classes="text-red-600"
            />
          </div>

          <div className="flex flex-wrap gap-space8 sm:gap-space12">
            <BODateRangePicker />
          </div>
        </div>

        <GeneralSalesReport />
        <TotalDueCalculation /> */}
        <AllBusinessReportsCards />
      </div>
      {/*Dialog*/}
    </>
  );
};

export default HomePage;

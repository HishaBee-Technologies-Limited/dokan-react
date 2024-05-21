import React from 'react';
import Card from '@/components/common/Card';
import DueDialogs from '@/components/due/dialogs';
import DueDrawers from '@/components/due/drawers';
import DueHeader from '@/components/due/DueHeader';
import { getAllDue } from '@/actions/due/getAllDue';
import { LeftSection } from '@/components/due/LeftSection';
import { IDueItemsResponse } from '@/types/due/dueResponse';
import { RightSection } from '@/components/due/RightSection';
import { getDueItemByUniqueID } from '@/actions/due/getDueItemByUniqueID';

type IContactProps = {
  params: { locale: string };
  searchParams: any;
};

const DuePage = async ({ params: { locale }, searchParams }: IContactProps) => {
  const userID = searchParams.active_user || '';
  const tab = searchParams.tab || '';

  const dueList = await getAllDue();
  const dueItems = await getDueItemByUniqueID(`${userID}`);

  const customerDueList = dueList?.data?.data.filter(
    (item) => item.contact_type === 'CUSTOMER'
  );

  const supplierDueList = dueList?.data?.data.filter(
    (item) => item.contact_type === 'SUPPLIER'
  );

  let filteredDueList;
  if (tab === 'Customer') {
    filteredDueList = customerDueList;
  }

  if (tab === 'Supplier') {
    filteredDueList = supplierDueList;
  }
  // const employeeDueList = dueList?.data?.data.filter(
  //   (item) => item.employee === "SUPPLIER"
  // );

  // console.log(dueList);

  const positiveValue = dueList?.data?.data
    ?.filter((item) => item.due_amount > 0)
    .reduce((acc, item) => {
      return acc + item.due_amount;
    }, 0);

  const negativeValue = dueList?.data?.data
    ?.filter((item) => item.due_amount < 0)
    .reduce((acc, item) => {
      return acc + item.due_amount;
    }, 0);

  const metaData = {
    total_get: negativeValue ?? 0,
    total_give: positiveValue ?? 0,
  };

  // console.log(positiveValue, negativeValue);

  return (
    <>
      <div className="space-y-space16 h-full">
        <DueHeader />

        <Card className="space-y-space16 lg:space-y-0 lg:flex h-[calc(100%-6.4rem)]">
          <LeftSection
            dueList={filteredDueList as any}
            totalValues={metaData}
          />
          {dueItems?.data ? (
            <RightSection
              dueItems={dueItems?.data as IDueItemsResponse[]}
              totalValues={dueItems.metadata}
            />
          ) : (
            <></>
          )}
        </Card>
      </div>

      <DueDialogs />
      <DueDrawers dueList={{ supplierDueList, customerDueList }} />
    </>
  );
};

export default DuePage;

import React from 'react';
import Card from '@/components/common/Card';
import DueDialogs from '@/components/due/dialogs';
import DueDrawers from '@/components/due/drawers';
import DueHeader from '@/components/due/DueHeader';
import { getAllDue } from '@/actions/due/getAllDue';
import { LeftSection } from '@/components/due/LeftSection';
import { IDueItemsResponse, IDueListResponse } from '@/types/due/dueResponse';
import { RightSection } from '@/components/due/RightSection';
import { getDueItemByUniqueID } from '@/actions/due/getDueItemByUniqueID';

type IContactProps = {
  params: { locale: string };
  searchParams: any;
};

const DuePage = async ({ params: { locale }, searchParams }: IContactProps) => {
  const userID = searchParams.active_user || '';
  const tab = searchParams.tab || '';
  // const page = searchParams.page || '';
  // console.log(page);
  // let hasMore = true;

  // let dueList = [] as any;
  // if (hasMore) {
  //   const res = await getAllDue({ page });
  //   if (!res?.data?.data.length) {
  //     hasMore = false;
  //   }
  //   const arr =
  //     dueList && ([...dueList, res?.data?.data] as IDueListResponse[]);
  //   dueList = arr?.reduce((acc: IDueListResponse[], curr: IDueListResponse) => {
  //     const temp = acc?.some(
  //       (due: IDueListResponse) => due.unique_id === curr.unique_id
  //     );
  //     if (!temp) {
  //       acc = [...acc, curr];
  //       return acc;
  //     }
  //   }, [])[0];
  //   console.log(dueList);
  // }

  const dueItems = await getDueItemByUniqueID(`${userID}`);

  // const customerDueList = dueList?.filter(
  //   (item: IDueListResponse) => item.contact_type === 'CUSTOMER'
  // );

  // const supplierDueList = dueList?.filter(
  //   (item: IDueListResponse) => item.contact_type === 'SUPPLIER'
  // );

  // const employeeDueList = dueList?.filter(
  //   (item: IDueListResponse) => item.contact_type === 'EMPLOYEE'
  // );
  // let filteredDueList;
  // if (tab === 'Customer') {
  //   filteredDueList = customerDueList;
  // }

  // if (tab === 'Supplier') {
  //   filteredDueList = supplierDueList;
  // }

  // if (tab === 'Employee') {
  //   filteredDueList = employeeDueList;
  // }

  // const positiveValue = dueList
  //   ?.filter((item: IDueListResponse) => item.due_amount > 0)
  //   .reduce((acc: number, item: IDueListResponse) => {
  //     return acc + item.due_amount;
  //   }, 0);

  // const negativeValue = dueList?.data?.data
  //   ?.filter((item: IDueListResponse) => item.due_amount < 0)
  //   .reduce((acc: number, item: IDueListResponse) => {
  //     return acc + item.due_amount;
  //   }, 0);

  // const metaData = {
  //   total_get: negativeValue ?? 0,
  //   total_give: positiveValue ?? 0,
  // };

  return (
    <>
      <div className="space-y-space16 h-full">
        <DueHeader />

        <Card className="space-y-space16 lg:space-y-0 lg:flex h-[calc(100%-6.4rem)]">
          <LeftSection />
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
      <DueDrawers />
    </>
  );
};

export default DuePage;

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

  const dueList = await getAllDue();
  const dueItems = await getDueItemByUniqueID(`${userID}`);

  return (
    <>
      <div className="space-y-space16 h-full">
        <DueHeader />

        <Card className="space-y-space16 lg:space-y-0 lg:flex h-[calc(100%-6.4rem)]">
          <LeftSection
            dueList={dueList?.data}
            totalValues={dueList?.metadata}
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
      <DueDrawers />
    </>
  );
};

export default DuePage;

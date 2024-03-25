'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import Card from '@/components/common/Card';
import { Input } from '@/components/ui/input';
import CustomTab from '@/components/common/Tab';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePathname, useRouter } from 'next/navigation';
import { IDueListResponse } from '@/types/due/dueResponse';
import FallBackImage from '@/components/common/FallBackImage';
import WrapperOddList from '@/components/common/WrapperOddList';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import CardWithSideIndicator from '@/components/common/CardWithSideIndicator';

const tabData = [
  {
    label: 'Customer',
    value: 'Customer',
  },
  {
    label: 'Supplier',
    value: 'Supplier',
  },
  {
    label: 'Employee',
    value: 'Employee',
  },
];

interface IProps {
  dueList: IDueListResponse[] | undefined;
  totalValues:
    | {
        total_get: number;
        total_give: number;
      }
    | undefined;
}

export const LeftSection = ({ dueList, totalValues }: IProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { getQueryString, setQueryString } = useCreateQueryString();

  const activeTab = getQueryString('tab') ?? '';
  const activeUser = getQueryString('active_user') ?? '';

  const checkDueValue = (value: number): 'success' | 'error' | undefined => {
    if (value > 0) {
      return 'success';
    } else if (value < 0) {
      return 'error';
    }
  };

  const filteredDueList = dueList?.filter(
    (item) => item.contact_type === activeTab.toUpperCase()
  );

  useEffect(() => {
    router.replace(
      `${pathname}?${setQueryString('tab', activeTab ? activeTab : 'Customer')}`
    );
  }, [activeTab]);

  return (
    <Card className="h-full lg:w-4/12 flex flex-col gap-space16 lg:border-r border-color lg:rounded-tr-none">
      <div className="space-y-space8 w-full">
        <CustomTab
          data={tabData}
          active={activeTab}
          className="border-b w-full  px-space12 sm:px-space16 pt-space8"
          handleChange={(item) => {
            router.replace(`${pathname}?${setQueryString('tab', item.value)}`);
          }}
        />

        <Card className="grid grid-cols-2  px-space12 sm:px-space16">
          <article className="border-r border-color text-center">
            <Text
              title="You’ll Give"
              variant="secondary"
              className="text-sm font-medium"
            />
            <Text
              title={`৳ ${totalValues?.total_give}`}
              className="font-semibold text-lg"
              variant="error"
            />
          </article>
          <article className=" text-center">
            <Text
              title="You’ll Get"
              variant="secondary"
              className="text-sm font-medium"
            />
            <Text
              title={`৳ ${totalValues?.total_get}`}
              className="font-semibold text-lg"
              variant="success"
            />
          </article>
        </Card>

        <div className=" px-space12 sm:px-space16">
          <Input placeholder="Search contact" />
        </div>
      </div>

      <ScrollArea className="h-[calc(100%-20.6rem)] overflow-y-scroll  px-space12 sm:px-space16">
        {filteredDueList?.length ? (
          <WrapperOddList>
            {filteredDueList?.map((item, index) => (
              <CardWithSideIndicator
                key={index}
                active={item.unique_id === activeUser}
                onClick={() =>
                  router.push(
                    `${pathname}?${setQueryString(
                      'active_user',
                      item.unique_id
                    )}`
                  )
                }
              >
                <div className="w-full flex items-center gap-space8">
                  <FallBackImage
                    src={''}
                    fallback={item.contact_name.charAt(0)}
                  />

                  <div className="w-full flex items-center justify-between gap-space12">
                    <article>
                      <Text
                        title={item.contact_name}
                        className="!text-md font-medium"
                      />
                      <Text title={item.contact_mobile} variant="muted" />
                    </article>

                    {item.due_amount !== 0 && (
                      <article className="flex flex-col items-end">
                        <Text
                          className="font-medium"
                          variant={checkDueValue(item.due_amount)}
                          title={`${
                            checkDueValue(item.due_amount) === 'success'
                              ? '+'
                              : ''
                          }${item.due_amount}`}
                        />
                        <Text
                          title={
                            checkDueValue(item.due_amount) === 'success'
                              ? 'Taken'
                              : 'Given'
                          }
                          variant="white"
                          className={`text-end max-w-max text-xs px-space12 py-[.2rem] rounded-full dark:!text-primary-100 ${
                            checkDueValue(item.due_amount) === 'success'
                              ? 'bg-success-100'
                              : 'bg-error-100'
                          }`}
                        />
                      </article>
                    )}
                  </div>
                </div>
              </CardWithSideIndicator>
            ))}
          </WrapperOddList>
        ) : (
          <div className="mt-[6rem] flex items-center justify-center">
            <Link href={`/contact?tab=${activeTab}`}>
              <Button>Add New {`${activeTab}`}</Button>
            </Link>
          </div>
        )}
      </ScrollArea>
    </Card>
  );
};

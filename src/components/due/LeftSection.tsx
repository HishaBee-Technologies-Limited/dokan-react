'use client';
import Link from 'next/link';
import React, { ChangeEvent, useEffect, useState } from 'react';
import Card from '@/components/common/Card';
import CustomTab from '@/components/common/Tab';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IDueListResponse } from '@/types/due/dueResponse';
import FallBackImage from '@/components/common/FallBackImage';
import WrapperOddList from '@/components/common/WrapperOddList';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import CardWithSideIndicator from '@/components/common/CardWithSideIndicator';
import { useDueStore } from '@/stores/useDueStore';
import { useInView } from 'react-intersection-observer';
import { useDuePagination } from '@/hooks/useDuePagination';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

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

export const LeftSection = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { getQueryString, setQueryString } = useCreateQueryString();
  const currentSearchParams = useSearchParams();
  const setDueList = useDueStore((state) => state.setDueList);
  const [page, setPage] = useState(1);
  const [userSearch, setUserSearch] = useState('');
  const [dueFilterList, setDueFilterList] = useState<
    IDueListResponse[] | undefined
  >();
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.1,
    delay: 2000,
  });
  const { loading, hasMore, dueRes } = useDuePagination(page, '');
  const activeTab = getQueryString('tab') ?? '';
  const activeUser = getQueryString('active_user') ?? '';

  const checkDueValue = (value: number): 'success' | 'error' | undefined => {
    if (value > 0) {
      return 'error';
    } else if (value < 0) {
      return 'success';
    }
  };

  useEffect(() => {
    if (dueRes) {
      setDueFilterList(dueRes);
    }
  }, [dueRes]);

  // const filteredDueList = dueList?.data?.filter(
  //   (item) => item.contact_type === activeTab.toUpperCase()
  // );

  useEffect(() => {
    setPage((prevPage) => prevPage + 1);
  }, [inView]);

  useEffect(() => {
    let temArr = dueRes && [...dueRes];

    const temArr2 = temArr?.filter(
      (user) =>
        user.contact_name.includes(userSearch) ||
        user.contact_mobile.includes(userSearch)
    );
    setDueFilterList(temArr2);
  }, [userSearch]);

  useEffect(() => {
    setPage(1);
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

        {/* <Card className="grid grid-cols-2  px-space12 sm:px-space16">
          <article className="border-r border-color text-center">
            <Text
              title="You’ll Give"
              variant="secondary"
              className="text-sm font-medium"
            />
            <Text
              title={`৳ ${totalValues?.total_give}`}
              className="font-semibold text-lg"
              variant="success"
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
              variant="error"
            />
          </article>
        </Card> */}

        <div className=" px-space12 sm:px-space16">
          <Input
            value={userSearch}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUserSearch(e.target.value)
            }
            placeholder="Search contact"
          />
        </div>
      </div>

      <ScrollArea className="h-[calc(100%-6.6rem)]  px-space12 sm:px-space16">
        {dueFilterList?.length ? (
          <WrapperOddList>
            {dueFilterList?.map((item, index) => (
              <div key={index}>
                <CardWithSideIndicator
                  active={item.unique_id === activeUser}
                  onClick={() => {
                    router.push(
                      `${pathname}?${setQueryString(
                        'active_user',
                        item.unique_id
                      )}`
                    );
                    setDueList(dueRes);
                  }}
                >
                  {index === dueRes.length - 1 ? <div ref={ref}></div> : null}
                  <div className="w-full flex items-center gap-space8">
                    <FallBackImage
                      src={''}
                      fallback={item.contact_name.charAt(0)}
                      className={cn(
                        item.contact_name.includes('ENCRYPTED') && 'blur-sm'
                      )}
                    />

                    <div className="w-full flex items-center justify-between gap-space12">
                      <article>
                        <Text
                          title={item.contact_name}
                          className={cn(
                            item.contact_name.includes('ENCRYPTED') &&
                              'blur-sm',
                            '!text-md font-medium  w-24'
                          )}
                        />
                        <Text
                          title={item.contact_mobile}
                          className={cn(
                            item.contact_name.includes('ENCRYPTED') && 'blur-sm'
                          )}
                          variant="muted"
                        />
                      </article>

                      {item.due_amount !== 0 && (
                        <article className="flex flex-col items-end">
                          <Text
                            className="font-medium"
                            variant={checkDueValue(item.due_amount)}
                            title={`
                          ${Math.abs(item.due_amount)}`}
                          />
                          <Text
                            title={
                              checkDueValue(item.due_amount) === 'success'
                                ? 'Received'
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
              </div>
            ))}
          </WrapperOddList>
        ) : (
          <div className="mt-[6rem] flex items-center justify-center">
            <Link href={`/contact?tab=${activeTab}`}>
              <Button>Add New {`${activeTab}`}</Button>
            </Link>
          </div>
        )}
        {loading ? <div>Loading</div> : null}
      </ScrollArea>
    </Card>
  );
};

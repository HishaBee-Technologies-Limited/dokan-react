'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import Card from '@/components/common/Card';
import { Input } from '@/components/ui/input';
import CustomTab from '@/components/common/Tab';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePathname, useRouter } from 'next/navigation';
import { useContactStore } from '@/stores/useContactStore';
import FallBackImage from '@/components/common/FallBackImage';
import WrapperOddList from '@/components/common/WrapperOddList';
import { IUserResponse } from '@/types/contact/partyResponse';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import CardWithSideIndicator from '@/components/common/CardWithSideIndicator';
import { useContactPagination } from '@/hooks/useContactPagination';
import { useInView } from 'react-intersection-observer';

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

export const LeftSection = (
  {
    //   contactRes,
    // }: {
    //   contactRes: IUserResponse[] | undefined;
  }
) => {
  const router = useRouter();
  const pathname = usePathname();
  const { getQueryString, setQueryString } = useCreateQueryString();
  const [userSearch, setUserSearch] = useState('');
  const [userFilterList, setUserFilterList] = useState<
    IUserResponse[] | undefined
  >();
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.2,
    delay: 2000,
  });
  const [page, setPage] = useState(1);
  const { loading, hasMore, contactRes } = useContactPagination(page, '');

  const activeTab = getQueryString('tab') ?? '';
  const activeUser = getQueryString('active_user') ?? '';

  const { setContactDrawerState, setParty } = useContactStore((state) => state);

  useEffect(() => {
    if (contactRes) {
      setParty(contactRes[0]);
    }

    const params = {
      tab: activeTab ? activeTab : 'Customer',
      active_user: contactRes?.length ? String(contactRes[0].id) : '',
    };
    router.push(`${pathname}?${new URLSearchParams(params).toString()}`);
    setUserSearch('');
  }, [activeTab]);

  useEffect(() => {
    const params = {
      tab: 'Customer',
      active_user: contactRes?.length ? String(contactRes[0].id) : '',
    };
    router.push(`${pathname}?${new URLSearchParams(params).toString()}`);
  }, []);

  useEffect(() => {
    if (contactRes) {
      setUserFilterList(contactRes);
    }
  }, [contactRes]);
  useEffect(() => {
    let temArr = contactRes && [...contactRes];

    const temArr2 = temArr?.filter(
      (user) =>
        user.name.includes(userSearch) || user.mobile.includes(userSearch)
    );
    setUserFilterList(temArr2);
  }, [userSearch]);

  useEffect(() => {
    setPage((prevPage) => prevPage + 1);
  }, [inView]);
  console.log(contactRes);

  return (
    <Card className="h-full lg:w-4/12 flex flex-col gap-space16">
      <div className="space-y-space8 w-full">
        <CustomTab
          data={tabData}
          active={activeTab}
          className="border-b w-full px-space16 pt-space8"
          handleChange={(item) => {
            router.push(`${pathname}?${setQueryString('tab', item.value)}`);
          }}
        />
        <div className="px-space16">
          <Input
            placeholder="Search contact"
            value={userSearch}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUserSearch(e.target.value)
            }
          />
        </div>
      </div>

      <ScrollArea className="h-[calc(100%-20.6rem)] px-space16">
        <WrapperOddList>
          {userFilterList?.map((item, index) => (
            <CardWithSideIndicator
              key={item.id}
              active={item.id.toString() === activeUser}
              onClick={() => {
                router.push(
                  `${pathname}?${setQueryString('active_user', item.id)}`
                );
                setParty(item);
              }}
            >
              {contactRes && index === contactRes?.length - 1 ? (
                <div ref={ref}></div>
              ) : null}

              <div className="flex items-center gap-space8">
                <FallBackImage
                  src={item.image_src ?? ''}
                  fallback={item.name.charAt(0)}
                />
                <article>
                  <Text title={item.name} className="!text-md font-medium" />
                  <Text title={item.mobile} variant="muted" />
                </article>
              </div>
            </CardWithSideIndicator>
          ))}
          {loading ? <div>Loading</div> : null}
        </WrapperOddList>
      </ScrollArea>

      <div className="p-space16 border-t border-primary-20 dark:border-primary-80">
        <Button
          className="w-full"
          onClick={() =>
            setContactDrawerState({ open: true, header: `Add ${activeTab}` })
          }
        >
          Add {activeTab ? activeTab : 'Customer'}
        </Button>
      </div>
    </Card>
  );
};

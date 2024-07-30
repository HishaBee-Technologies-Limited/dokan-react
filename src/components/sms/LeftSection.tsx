'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import Card from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import CustomTab from '@/components/common/Tab';
import Search from '@/components/common/forms/Search';
import { ScrollArea } from '@/components/ui/scroll-area';
import FallBackImage from '@/components/common/FallBackImage';
import { IUserResponse } from '@/types/contact/partyResponse';
import { usePathname, useRouter } from 'next/navigation';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import { useContactStore } from '@/stores/useContactStore';
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

export const LeftSection = ({
  userList,
}: {
  userList: IUserResponse[] | undefined;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { getQueryString, setQueryString } = useCreateQueryString();
  const [userSearch, setUserSearch] = useState('');
  const [userFilterList, setUserFilterList] = useState<
    IUserResponse[] | undefined
  >();

  const activeTab = getQueryString('tab') ?? '';
  const activeUser = getQueryString('active_user') ?? '';

  const { setContactDrawerState, setParty, setContacts, contacts } =
    useContactStore((state) => state);

  useEffect(() => {
    if (userList) {
      setParty(userList[0]);
    }

    const params = {
      tab: activeTab ? activeTab : 'Customer',
      active_user: userList?.length ? String(userList[0].id) : '',
    };
    router.push(`${pathname}?${new URLSearchParams(params).toString()}`);
    setUserSearch('');
  }, [activeTab]);

  useEffect(() => {
    const params = {
      tab: 'Customer',
      active_user: userList?.length ? String(userList[0].id) : '',
    };
    router.push(`${pathname}?${new URLSearchParams(params).toString()}`);
  }, []);

  useEffect(() => {
    if (userList) {
      setUserFilterList(userList);
    }
  }, [userList]);
  useEffect(() => {
    let temArr = userList && [...userList];

    const temArr2 = temArr?.filter(
      (user) =>
        user.name.includes(userSearch) || user.mobile.includes(userSearch)
    );
    setUserFilterList(temArr2);
  }, [userSearch]);

  return (
    <div className="lg:pr-space12 lg:w-4/12 h-full">
      <Card className="h-full w-full shadow">
        <div className="px-space16 py-space8 space-y-space8">
          <CustomTab
            data={tabData}
            active={activeTab}
            className="border-b w-full"
            handleChange={(item) => {
              router.push(`${pathname}?${setQueryString('tab', item.value)}`);
            }}
          />

          <Search
            value={userSearch}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUserSearch(e.target.value)
            }
          />
        </div>

        <ScrollArea className="h-[calc(100%-12rem)] px-space8">
          {userFilterList?.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center gap-space12 justify-between py-space8 px-space8"
            >
              <div className="flex items-center gap-space8">
                <FallBackImage
                  src={item.image_src ?? ''}
                  fallback={item.name.charAt(0)}
                  className={cn(item.name.includes('ENCRYPTED') && 'blur-sm')}
                />
                <article className="max-w-96">
                  <Text
                    title={item.name}
                    className={cn(
                      item.name.includes('ENCRYPTED') && 'blur-sm',
                      'font-medium text-wrap w-24 '
                    )}
                  />
                  <Text
                    title={item.mobile}
                    className="font-medium text-sm"
                    variant="secondary"
                  />
                </article>
              </div>
              <Button
                size={'sm'}
                onClick={() => setContacts(item)}
                disabled={contacts?.some((user) => user.id === item.id)}
              >
                Add
              </Button>
            </div>
          ))}
        </ScrollArea>
      </Card>
    </div>
  );
};

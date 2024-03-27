'use client';
import React, { useEffect } from 'react';
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

  const activeTab = getQueryString('tab') ?? '';
  const activeUser = getQueryString('active_user') ?? '';

  const { setContactDrawerState } = useContactStore((state) => state);

  useEffect(() => {
    router.push(
      `${pathname}?${setQueryString('tab', activeTab ? activeTab : 'Customer')}`
    );
  }, [activeTab]);

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
          <Input placeholder="Search contact" />
        </div>
      </div>

      <ScrollArea className="h-[calc(100%-20.6rem)] px-space16">
        <WrapperOddList>
          {userList?.map((item, index) => (
            <CardWithSideIndicator
              key={item.id}
              active={item.id.toString() === activeUser}
              onClick={() =>
                router.push(
                  `${pathname}?${setQueryString('active_user', item.id)}`
                )
              }
            >
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

'use client';
import React from 'react';
import Card from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import Search from '@/components/common/forms/Search';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePathname, useRouter } from 'next/navigation';
import FallBackImage from '@/components/common/FallBackImage';
import { IUserResponse } from '@/types/contact/partyResponse';
import WrapperOddList from '@/components/common/WrapperOddList';
import { AddIcon, ExpandMoreIcon } from '@/components/common/icons';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import CardWithSideIndicator from '@/components/common/CardWithSideIndicator';
import { useAccessManagementStore } from '@/stores/useAccessManagementStore';
import { AccessManagementEnum } from '@/enum/accessManagement';

const users = [
  {
    id: 1,
    name: 'user 1',
    mobile: '01778263272',
    type: 'manager',
    image_src: '',
  },
  {
    id: 2,
    name: 'user 2',
    mobile: '01778263272',
    type: 'partner',
    image_src: '',
  },
  {
    id: 3,
    name: 'user 3',
    mobile: '01778263272',
    type: 'partner',
    image_src: '',
  },
];

export const LeftSection = ({
  userList,
}: {
  userList?: IUserResponse[] | undefined;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { getQueryString, setQueryString } = useCreateQueryString();
  const openDrawer = useAccessManagementStore((state) => state.setDrawerState);

  const activeUser = getQueryString('active_user') ?? '';

  return (
    <Card className="h-full lg:w-4/12 flex flex-col gap-space16 border-r rounded-r-none">
      <div className="space-y-space8 w-full p-space16">
        <Button variant={'outline'} className="w-full">
          Access Roles (3)
          <ExpandMoreIcon rotate={3} />
        </Button>
        <div className="">
          <Search placeholder="Search" onChange={() => {}} />
        </div>
      </div>

      <ScrollArea className="h-full px-space16">
        <WrapperOddList>
          {users?.map((item, index) => (
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
                  <div className="flex items-center gap-space12">
                    <Text title={item.name} className="font-medium" />
                    <Text
                      title={item.type}
                      className="text-sm font-medium px-space8 py-[.2rem] rounded-md bg-warning-40 uppercase"
                    />
                  </div>
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
            openDrawer({
              open: true,
              header: AccessManagementEnum.NEW_USER_ACCESS,
            })
          }
        >
          <AddIcon />
          Add New User
        </Button>
      </div>
    </Card>
  );
};

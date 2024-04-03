'use client';
import React from 'react';
import Link from 'next/link';
import Card from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePathname, useRouter } from 'next/navigation';
import { IUserResponse } from '@/types/contact/partyResponse';
import { AccessManagementEnum } from '@/enum/accessManagement';
import WrapperOddList from '@/components/common/WrapperOddList';
import { AddIcon, ExpandMoreIcon } from '@/components/common/icons';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import CardWithSideIndicator from '@/components/common/CardWithSideIndicator';
import { useAccessManagementStore } from '@/stores/useAccessManagementStore';

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
      <div className="w-full p-space16">
        <Link href="/access-management">
          <Button variant={'outline'} className="w-full">
            <ExpandMoreIcon rotate={1} />
            এক্সেস ইউজারস (৩টি)
          </Button>
        </Link>
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
              <Text title={item.type} className="font-medium" />
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
              header: AccessManagementEnum.NEW_ROLE,
            })
          }
        >
          <AddIcon />
          Add New Role
        </Button>
      </div>
    </Card>
  );
};

'use client';
import React from 'react';
import Card from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { useContactStore } from '@/stores/useContactStore';
import FallBackImage from '@/components/common/FallBackImage';
import { IUserResponse } from '@/types/contact/partyResponse';
import { ContactTable } from '@/components/contact/ContactTable';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';

export const RightSection = ({
  userDetails,
}: {
  userDetails: IUserResponse | undefined;
}) => {
  const { getQueryString } = useCreateQueryString();
  const activeTab = getQueryString('tab') ?? '';

  const { setContactDrawerState, setParty, party } = useContactStore(
    (state) => state
  );

  return (
    <Card className="h-full lg:w-8/12">
      <div className="px-space16 my-space8 border-b border-primary-20 dark:border-primary-80">
        <div className="flex gap-space16 items-center justify-between py-space8">
          <div className="flex items-center gap-space8">
            <FallBackImage
              src={userDetails?.image_src ?? ''}
              fallback={userDetails?.name?.charAt(0) ?? ''}
            />
            <article>
              <Text
                title={userDetails?.name}
                className="!text-lg font-medium"
              />
              <Text variant="muted">
                {activeTab} | {userDetails?.mobile}{' '}
                {userDetails?.email && `| ${userDetails.email}`}
              </Text>
            </article>
          </div>

          <Button
            size={'sm'}
            variant={'outline'}
            onClick={() => {
              setParty(userDetails as IUserResponse);
              setContactDrawerState({
                open: true,
                header: `Edit ${activeTab}`,
              });
            }}
          >
            Edit
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[calc(100%-9rem)] pb-space16 px-space16">
        <ContactTable />

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Card>
  );
};

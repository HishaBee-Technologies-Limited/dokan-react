'use client';
import React from 'react';
import { DueEnum } from '@/enum/due';
import Card from '@/components/common/Card';
import Icon from '@/components/common/Icon';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { useDueStore } from '@/stores/useDueStore';
import { DueTable } from '@/components/due/DueTable';
import { IDueItemsResponse } from '@/types/due/dueResponse';
import FallBackImage from '@/components/common/FallBackImage';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';

interface IProps {
  dueItems: IDueItemsResponse[];
  totalValues: {
    total_give: number;
    total_get: number;
  };
}

export const RightSection = ({ dueItems, totalValues }: IProps) => {
  const { getQueryString } = useCreateQueryString();
  const activeTab = getQueryString('tab') ?? '';

  const handleDialogOpen = useDueStore((state) => state.setDialogState);
  const handleDrawerOpen = useDueStore((state) => state.setDrawerState);

  const handleGivenClick = () => {
    if (activeTab === DueEnum.CUSTOMER) {
      handleDialogOpen({ open: true, header: DueEnum.SELECT_DUE_TYPE });
    } else if (activeTab === DueEnum.SUPPLIER) {
      handleDrawerOpen({ open: true, header: DueEnum.MONEY_GIVEN_ENTRY });
    }
  };

  const handleReceivedClick = () => {
    if (activeTab === DueEnum.CUSTOMER) {
      handleDrawerOpen({ open: true, header: DueEnum.MONEY_GIVEN_ENTRY });
    } else if (activeTab === DueEnum.SUPPLIER) {
      handleDialogOpen({ open: true, header: DueEnum.SELECT_DUE_TYPE });
    }
  };

  return (
    <Card className="h-full lg:w-8/12 flex flex-col gap-space8">
      <div className="px-space16 my-space8 border-b border-color">
        <div className="flex gap-space16 items-center justify-between py-space8">
          <div className="flex items-center gap-space8">
            <FallBackImage
              src={''}
              fallback={dueItems[0].due.contact_name.charAt(0)}
            />
            <article>
              <Text
                title={dueItems[0].due.contact_name}
                className="!text-lg font-medium"
              />
              <Text variant="muted">
                {dueItems[0].due.contact_type} |{' '}
                {dueItems[0].due.contact_mobile}
              </Text>
            </article>
          </div>

          <article className=" text-center">
            <Text
              title="Balance"
              variant="secondary"
              className="text-sm font-medium"
            />
            <Text
              title={`৳ ${dueItems[0].due.due_amount}`}
              className="font-semibold text-lg"
              variant="success"
            />
          </article>
        </div>

        <div className="flex gap-space16 items-center justify-between py-space8 border-t border-color">
          <Text
            title="When will the Customer Return your Due?"
            className="text-sm"
          />

          <Button
            size={'sm'}
            variant={'secondary'}
            onClick={() =>
              handleDialogOpen({ open: true, header: DueEnum.DUE_REMINDER })
            }
          >
            <Icon icon="mdi:alarm-clock-add" />
            Set due Reminder
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[calc(100%-9rem)] pb-space16 px-space16">
        <DueTable dueItems={dueItems} />

        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="p-space12 sm:p-space16 border-t border-primary-20 dark:border-primary-80">
        <article className="sm:px-space12 flex justify-between gap-space8 pb-space8">
          <Text title="Total" className="text-sm font-bold" />

          <article className="sm:w-1/2 md:pl-space16 flex justify-between gap-space16">
            <Text
              title={`৳ ${totalValues.total_get}`}
              variant="success"
              className="text-sm font-bold"
            />
            <Text
              title={`৳ ${totalValues.total_give}`}
              variant="error"
              className="text-sm font-bold"
            />
            <Text
              className="text-sm font-bold"
              title={`৳ ${totalValues.total_give - totalValues.total_get}`}
              variant={
                totalValues.total_give - totalValues.total_get < 0
                  ? 'success'
                  : 'error'
              }
            />
          </article>
        </article>

        <div className="grid grid-cols-2 gap-space16">
          <Button
            variant={'danger'}
            className="w-full"
            onClick={handleGivenClick}
          >
            Given
          </Button>
          <Button
            variant={'success'}
            className="w-full"
            onClick={handleReceivedClick}
          >
            Received
          </Button>
        </div>
      </div>
    </Card>
  );
};

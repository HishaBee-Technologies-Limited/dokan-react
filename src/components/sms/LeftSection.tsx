'use client';
import React from 'react';
import Card from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import CustomTab from '@/components/common/Tab';
import Search from '@/components/common/forms/Search';
import { ScrollArea } from '@/components/ui/scroll-area';
import FallBackImage from '@/components/common/FallBackImage';

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

export const LeftSection = () => {
  const [activeTab, setActiveTab] = React.useState<string>('Customer');

  return (
    <div className="lg:pr-space12 lg:w-4/12 h-full">
      <Card className="h-full w-full shadow">
        <div className="px-space16 py-space8 space-y-space8">
          <CustomTab
            data={tabData}
            active={activeTab}
            className="border-b w-full"
            handleChange={(item) => setActiveTab(item.value)}
          />

          <Search onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}} />
        </div>

        <ScrollArea className="h-[calc(100%-12rem)] px-space8">
          {Array(40)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-space12 justify-between py-space8 px-space8"
              >
                <div className="flex items-center gap-space8">
                  <FallBackImage
                    src=""
                    fallback="M"
                    className="!h-space32 !w-space32"
                  />
                  <article className="">
                    <Text title="আরিফুল ইসলাম" className="font-medium" />
                    <Text
                      title="01542141414"
                      className="font-medium text-sm"
                      variant="secondary"
                    />
                  </article>
                </div>
                <Button size={'sm'}>Add</Button>
              </div>
            ))}
        </ScrollArea>
      </Card>
    </div>
  );
};

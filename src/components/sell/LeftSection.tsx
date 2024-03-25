'use client';
import React from 'react';
import Card from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { Image } from '@/components/common/Image';
import { ScrollArea } from '@/components/ui/scroll-area';
import ProductListQueries from '@/components/sell/ProductListQueries';

export const LeftSection = () => {
  return (
    <div className="lg:pr-space12 lg:w-4/12 h-full">
      <Card className="h-full w-full shadow">
        <ProductListQueries />

        <ScrollArea className="h-[calc(100%-14rem)] overflow-y-scroll px-space8">
          {Array(40)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-space12 justify-between py-space8 px-space8"
              >
                <div className="flex items-center gap-space8">
                  <Image height={32} width={32} src="" alt="" />
                  <Text title="কোকাকোলা ৪০০ মিলি" className="text-sm" />
                </div>
                <Button size={'sm'}>Add</Button>
              </div>
            ))}
        </ScrollArea>
      </Card>
    </div>
  );
};

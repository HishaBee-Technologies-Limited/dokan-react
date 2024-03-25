'use client';
import React from 'react';
import Card from '@/components/common/Card';
import { Text } from '@/components/common/text';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import MySMS from '@/components/online-shop/messages/MySMS';
import { ArrowForwardIcon } from '@/components/common/icons';
import FallBackImage from '@/components/common/FallBackImage';
import { useOnlineShopStore } from '@/stores/useOnlineShopStore';
import SendingSMS from '@/components/online-shop/messages/SendingSMS';
import OppositeSMS from '@/components/online-shop/messages/OppositeSMS';

const MessageList = () => {
  const activeUserItem = useOnlineShopStore((state) => state.activeUserItem);
  const setActiveUserItem = useOnlineShopStore(
    (state) => state.setActiveUserItem
  );

  return (
    <Card
      className={`h-full w-full flex flex-col gap-space4 ${activeUserItem ? 'flex' : 'hidden sm:flex md:hidden lg:flex'}`}
    >
      <div className="w-full flex items-center gap-space8 px-space12 py-space8 border-b border-color">
        <Button
          size={'icon'}
          variant={'transparent'}
          onClick={() => setActiveUserItem(0)}
          className={'flex sm:hidden md:flex lg:hidden'}
        >
          <ArrowForwardIcon rotate={2} />
        </Button>

        <div className="w-full flex items-center gap-space8 ">
          <FallBackImage src="" fallback="M" />

          <article>
            <Text title="নিজাম উদ্দিন" className="text-lg font-medium" />
            <Text title="01542141414" variant="muted" className="font-medium" />
          </article>
        </div>
      </div>

      <ScrollArea className="h-full p-space12">
        <div className="flex flex-col gap-space8">
          <OppositeSMS />
          <MySMS />
          <OppositeSMS />
          <MySMS />
          <OppositeSMS />
          <MySMS />
          <OppositeSMS />
          <MySMS />
          <OppositeSMS />
          <MySMS />
        </div>
      </ScrollArea>

      <SendingSMS />
    </Card>
  );
};

export default MessageList;

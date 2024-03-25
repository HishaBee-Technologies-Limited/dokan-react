'use client';
import React from 'react';
import { Text } from '@/components/common/text';
import Search from '@/components/common/forms/Search';
import { ScrollArea } from '@/components/ui/scroll-area';
import FallBackImage from '@/components/common/FallBackImage';
import WrapperOddList from '@/components/common/WrapperOddList';
import { useOnlineShopStore } from '@/stores/useOnlineShopStore';
import CardWithSideIndicator from '@/components/common/CardWithSideIndicator';

const UserList = () => {
  const activeUserItem = useOnlineShopStore((state) => state.activeUserItem);
  const setActiveUserItem = useOnlineShopStore(
    (state) => state.setActiveUserItem
  );

  return (
    <div
      className={`h-full w-full sm:max-w-[24.4rem] md:max-w-full lg:max-w-[24.4rem] flex-col gap-space12 ${activeUserItem ? 'hidden sm:flex md:hidden lg:flex' : 'flex'}`}
    >
      <Search onChange={() => {}} />
      <ScrollArea className="h-full">
        <WrapperOddList>
          {Array(40)
            .fill(0)
            .map((_, index) => (
              <CardWithSideIndicator
                key={index}
                active={index === activeUserItem}
                onClick={() => setActiveUserItem(index)}
                className="py-space8"
              >
                <div className="w-full flex items-center gap-space8">
                  <FallBackImage
                    src=""
                    fallback="M"
                    className="h-space32 w-space32"
                  />

                  <article>
                    <Text
                      title="নিজাম উদ্দিন"
                      className="text-sm font-medium"
                    />
                    <Text
                      title="01542141414"
                      variant="muted"
                      className="text-xs font-medium"
                    />
                  </article>
                </div>
              </CardWithSideIndicator>
            ))}
        </WrapperOddList>
      </ScrollArea>
    </div>
  );
};

export default UserList;

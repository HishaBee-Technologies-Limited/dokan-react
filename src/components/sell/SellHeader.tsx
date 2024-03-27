'use client';
import React from 'react';
import Image from 'next/image';
import { SellEnum } from '@/enum/sell';
import { Button } from '@/components/ui/button';
import { PageTitle } from '@/components/common/text';
import { useSellStore } from '@/stores/useSellStore';

const SellHeader = () => {
  const handleDrawerOpen = useSellStore((state) => state.setSellDrawerState);

  return (
    <div className="flex flex-wrap gap-space16 justify-between items-center">
      <PageTitle title="Select Products to Sell" />

      <Button
        variant={'secondary'}
        onClick={() =>
          handleDrawerOpen({ open: true, header: SellEnum.QUICK_SELL })
        }
      >
        <Image src="/images/quick_sell.svg" height={20} width={20} alt="" />
        <span>{SellEnum.QUICK_SELL}</span>
      </Button>
    </div>
  );
};

export default SellHeader;

'use client';
import { DueEnum } from '@/enum/due';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { Image } from '@/components/common/Image';
import { useDueStore } from '@/stores/useDueStore';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';

const dueTypes = [
  {
    title: 'Product Due',
    value: 'product_due',
    img: '/images/product_due.svg',
  },
  { title: 'Money Due', value: 'money_due', img: '/images/money.svg' },
];

const SelectDueType = () => {
  const router = useRouter();
  const [activeDueType, setActiveDueType] = useState<string>();

  const { getQueryString } = useCreateQueryString();
  const activeTab = getQueryString('tab') ?? '';

  const handleDrawerOpen = useDueStore((state) => state.setDrawerState);
  const handleDialogClose = useDueStore((state) => state.setDialogState);

  const handleDueType = (type: string) => {
    setActiveDueType(type);
    if (type === 'product_due') {
      handleDialogClose({ open: false });
      if (activeTab === DueEnum.CUSTOMER) {
        router.push('/sell');
      } else {
        router.push('/purchase');
      }
    } else {
      if (activeTab === DueEnum.CUSTOMER) {
        handleDrawerOpen({ open: true, header: DueEnum.MONEY_GIVEN_ENTRY });
      } else {
        handleDrawerOpen({ open: true, header: DueEnum.MONEY_RECEIVED_ENTRY });
      }
    }
  };

  return (
    <div className="grid grid-cols-2 gap-space16 py-space16 pb-space32 px-space16">
      {dueTypes.map((item, index) => (
        <Button
          key={index}
          variant={'secondary'}
          onClick={() => handleDueType(item.value)}
          className={`flex flex-col items-center gap-space8 h-[11rem] ${
            activeDueType === item.value
              ? 'border-primary-100 dark:border-primary-100'
              : ''
          }`}
        >
          <Image src={item.img} alt={item.title} height={56} width={56} />
          <Text title={item.title} className="font-semibold" />
        </Button>
      ))}
    </div>
  );
};

export default SelectDueType;

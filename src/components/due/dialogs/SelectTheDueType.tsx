'use client';
import Link from 'next/link';
import { DueEnum } from '@/enum/due';
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { Image } from '@/components/common/Image';
import { useDueStore } from '@/stores/useDueStore';
import { DialogFooter } from '@/components/common/Dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const dueTypes = [
  {
    title: 'Product Due',
    value: 'product_due',
    img: '/images/product_due.svg',
  },
  { title: 'Money Due', value: 'money_due', img: '/images/money.svg' },
];

const cashType = [
  { value: 'given', label: 'Given', dis: 'You give money' },
  { value: 'received', label: 'Received', dis: 'You received money' },
];

const SelectTheDueType = () => {
  const [activeDueType, setActiveDueType] = useState<string>();
  const [activeCash, setActiveCash] = useState<string>('given');
  const [showCashType, setShowCashType] = React.useState(false);

  const handleDrawerOpen = useDueStore((state) => state.setDrawerState);
  const handleDialogClose = useDueStore((state) => state.setDialogState);

  const handleDueType = (type: string) => {
    setActiveDueType(type);
    if (type === 'product_due') {
      setShowCashType(true);
    } else {
      setShowCashType(false);
      handleDrawerOpen({ open: true, header: DueEnum.ADD_MONEY_GIVEN_ENTRY });
    }
  };

  const activeCashColor = (active: string): string => {
    if (activeCash === 'given' && activeCash === active) {
      return 'border-error-100 dark:border-primary-80';
    } else if (activeCash === 'received' && activeCash === active) {
      return 'border-success-100 dark:border-primary-80';
    } else {
      return 'border-color';
    }
  };

  return (
    <div>
      <div className="py-space16 space-y-space16 px-space16">
        <div className="grid grid-cols-2 gap-space16">
          {dueTypes.map((item, index) => (
            <Button
              key={index}
              variant={'secondary'}
              onClick={() => handleDueType(item.value)}
              className={`flex flex-col items-center gap-space8 h-[11rem] ${activeDueType === item.value ? 'border-primary-100 dark:border-primary-100' : ''}`}
            >
              <Image src={item.img} alt={item.title} height={56} width={56} />
              <Text title={item.title} className="font-semibold" />
            </Button>
          ))}
        </div>

        <div
          className={`grid ${showCashType ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} duration-300`}
        >
          <div className="space-y-space12 overflow-hidden">
            <Text title="Cash" />

            <RadioGroup
              onValueChange={setActiveCash}
              defaultValue={activeCash}
              className="flex gap-space8"
            >
              {cashType.map((item) => (
                <Label
                  key={item.value}
                  htmlFor={item.value}
                  className={`flex rounded-md border-2 py-space12 px-space12 gap-space8 w-full ${activeCashColor(item.value)}`}
                >
                  <RadioGroupItem id={item.value} value={item.value} />
                  <article className="font-normal w-full space-y-space12">
                    <Text title={item.label} className="font-medium" />
                    <Text title={item.dis} variant="secondary" />
                  </article>
                </Label>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>

      <DialogFooter>
        {showCashType ? (
          <Link
            href={
              activeCash === 'given'
                ? '/sell'
                : activeCash === 'received'
                  ? '/purchase'
                  : '#'
            }
            onClick={() => handleDialogClose({ open: false })}
          >
            <Button className="w-full">Continue</Button>
          </Link>
        ) : (
          <Button disabled={!showCashType} className="w-full">
            Continue
          </Button>
        )}
      </DialogFooter>
    </div>
  );
};

export default SelectTheDueType;

'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import Card from '@/components/common/Card';
import Icon from '@/components/common/Icon';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/common/Image';
import { PageSubTitle, Text } from '@/components/common/text';

const shopData = [
  {
    id: 1,
    active: true,
    name: 'আমিরা স্টোর',
    img: '/images/shop_view.svg',
    address: 'মোহাম্মদপুর, ঢাকা - ১২০০',
  },
  {
    id: 2,
    active: false,
    name: 'আমিরা স্টোর',
    img: '/images/shop_view.svg',
    address: 'মোহাম্মদপুর, ঢাকা - ১২০০',
  },
  {
    id: 3,
    active: false,
    name: 'আমিরা স্টোর',
    img: '/images/shop_view.svg',
    address: 'মোহাম্মদপুর, ঢাকা - ১২০০',
  },
];

const SwitchShopPage = () => {
  const [selectShop, setSelectShop] = useState<number | null>(null);

  const handleEditClick = (shop: any) => {};

  return (
    <div className="space-y-space16">
      <PageSubTitle title="Switch your Shop" />

      <div className="grid gap-space16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3">
        {shopData.map((shop) => (
          <Card
            key={shop.id + 'shop'}
            onClick={() =>
              setSelectShop((prv) => (shop.active ? prv : shop.id))
            }
            className={`p-space16 w-full flex flex-col items-center relative shadow-sm border-color
                        ${shop.active ? '!bg-transparent dark:!bg-transparent border-[.2rem]' : 'cursor-pointer'}
                        ${selectShop === shop.id ? 'border-[.2rem]' : ''}
                        `}
          >
            {shop.active && (
              <article className="flex items-center gap-space8 absolute top-space16 left-space24">
                <div className="h-space10 w-space10 bg-success-100 rounded-full"></div>
                <Text title="Active shop" className="text-xs font-semibold" />
              </article>
            )}

            <div className="mt-space32 flex flex-col items-center gap-space12">
              <Image src={shop.img} alt="" height={84} width={84} />

              <Text title={shop.name} className="font-semibold" />
              <Text
                title={shop.address}
                variant="secondary"
                className="text-sm"
              />

              <Link href={'/settings/shop/edit'}>
                <Button
                  size={'sm'}
                  variant="secondary"
                  className="sm:px-space32"
                  onClick={() => handleEditClick(shop)}
                >
                  <Icon icon="mdi:store-edit-outline" height={24} width={24} />
                  <Text title="Edit Shop" className="font-semibold text-sm" />
                </Button>
              </Link>
            </div>
          </Card>
        ))}

        <Card
          className={`p-space16 py-space40 w-full flex flex-col items-center shadow-sm border border-color border-color gap-space32`}
        >
          <Image src={'/images/add_shop.svg'} alt="" height={84} width={84} />

          <Link href={'/settings/shop/add'}>
            <Button variant="secondary" className="sm:px-space32">
              <Icon
                icon="fontisto:shopping-basket-add"
                height={24}
                width={24}
              />
              <Text title="Add New Shop" className="font-semibold text-sm" />
            </Button>
          </Link>
        </Card>
      </div>

      <div className="flex justify-end gap-space12 mt-space16">
        <Button
          variant={'secondary'}
          className="!px-space40"
          onClick={() => setSelectShop(null)}
        >
          Cancel
        </Button>
        <Button disabled={!selectShop}>Change Shop</Button>
      </div>
    </div>
  );
};

export default SwitchShopPage;

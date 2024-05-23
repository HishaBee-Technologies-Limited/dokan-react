'use client';
import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';
import Card from '@/components/common/Card';
import Icon from '@/components/common/Icon';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/common/Image';
import { PageSubTitle, Text } from '@/components/common/text';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getAllShops } from '@/actions/shop/getAllShops';
import { IShopResponse } from '@/types/shop';
import { setCookie } from 'cookies-next';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ReloadIcon } from '@radix-ui/react-icons';

const ShopUi = ({ shops }: { shops: IShopResponse[] }) => {
  const router = useRouter();
  const [selectShop, setSelectShop] = useState<IShopResponse>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleEditClick = (shop: IShopResponse) => {
    router.push(
      `${pathname}/edit?${createQueryString('shopId', shop.id.toString())}`
    );
  };

  const handleContinue = async () => {
    setLoading(true);

    if (selectShop) {
      const shop = JSON.stringify({
        sms_count: selectShop.sms_count,
        subscription: selectShop.package,
      });
      setCookie('shopId', selectShop?.id);
      setCookie('shop', shop);
      router.push('/contact');
    }
  };

  console.log(shops);

  return (
    <div className="space-y-space16">
      <PageSubTitle title="Switch your Shop" />
      <ScrollArea className="h-[700px]">
        <div className="gap-space16 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3">
          {shops?.map((shop) => (
            <Card
              key={shop.id + 'shop'}
              onClick={() => setSelectShop(shop)}
              className={`p-space16 border-color relative flex w-full cursor-pointer flex-col items-center shadow-sm
                        ${selectShop?.id === shop.id ? 'border-[.3rem] border-green-400' : 'border'}
                        `}
            >
              <div className="mt-space32 gap-space12 flex flex-col items-center">
                <img
                  src={shop.logo_url ? shop.logo_url : `/images/shop_view.svg`}
                  alt=""
                  height={84}
                  width={84}
                />

                <Text title={shop.name} className="font-semibold" />
                <Text
                  title={shop.address}
                  variant="secondary"
                  className="text-sm"
                />

                <Button
                  size={'sm'}
                  variant="secondary"
                  className="sm:px-space32"
                  onClick={() => handleEditClick(shop)}
                >
                  <Icon icon="mdi:store-edit-outline" height={24} width={24} />
                  <Text title="Edit Shop" className="text-sm font-semibold" />
                </Button>
              </div>
            </Card>
          ))}

          <Card
            className={`p-space16 py-space40 border-color border-color gap-space32 flex w-full flex-col items-center border shadow-sm`}
          >
            <Image src={'/images/add_shop.svg'} alt="" height={84} width={84} />

            <Link href={'/shop/add'}>
              <Button variant="secondary" className="sm:px-space32">
                <Icon
                  icon="fontisto:shopping-basket-add"
                  height={24}
                  width={24}
                />
                <Text title="Add New Shop" className="text-sm font-semibold" />
              </Button>
            </Link>
          </Card>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="gap-space12 mt-space16 flex justify-end">
        <Button disabled={!selectShop} onClick={handleContinue}>
          {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ShopUi;

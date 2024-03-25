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

const SwitchShopPage = () => {
  const router = useRouter();
  const [selectShop, setSelectShop] = useState<number | null>(null);
  const [shops, setShops] = useState<IShopResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  const handleContinue = () => {
    console.log(selectShop);
    setCookie('shopId', selectShop);
    router.push('/contact');
  };

  useEffect(() => {
    const getShops = async () => {
      const shops = await getAllShops();
      console.log(shops);
      if (shops?.success) {
        setShops(shops?.data as IShopResponse[]);
      } else {
        setError(shops?.error as string);
      }
    };
    getShops();
  }, []);

  return (
    <div className="space-y-space16">
      <PageSubTitle title="Switch your Shop" />

      <div className="gap-space16 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3">
        {shops?.map((shop) => (
          <Card
            key={shop.id + 'shop'}
            onClick={() => setSelectShop(shop.id)}
            className={`p-space16 border-color relative flex w-full cursor-pointer flex-col items-center shadow-sm
                        ${selectShop === shop.id ? 'border-[.3rem]' : 'border'}
                        `}
          >
            <div className="mt-space32 gap-space12 flex flex-col items-center">
              <Image
                src={`/images/shop_view.svg`}
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

              {/* <Link href={"/shop/edit"}> */}
              <Button
                size={'sm'}
                variant="secondary"
                className="sm:px-space32"
                onClick={() => handleEditClick(shop)}
              >
                <Icon icon="mdi:store-edit-outline" height={24} width={24} />
                <Text title="Edit Shop" className="text-sm font-semibold" />
              </Button>
              {/* </Link> */}
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

      <div className="gap-space12 mt-space16 flex justify-end">
        <Button disabled={!selectShop} onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SwitchShopPage;

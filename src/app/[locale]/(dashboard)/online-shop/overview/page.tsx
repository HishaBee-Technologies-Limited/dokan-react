import React from 'react';
import { getShopInfo } from '@/actions/shop/getShopInfo';
import { cookies } from 'next/headers';
import { PageTitle, Text } from '@/components/common/text';
import Card from '@/components/common/Card';
import { Image } from '@/components/common/Image';
import ShopActions from '@/components/online-shop/ShopActions';
import { Link } from '@/navigation';

const overviewOther = [
  {
    img: '/images/online_message.svg',
    title: 'Online Message',
    url: 'messages',
  },
  {
    img: '/images/order_list.svg',
    title: 'Order list',
    url: 'orders',
  },
  {
    img: '/images/products.svg',
    title: 'Products',
    url: 'product',
  },
];

const Overview = async () => {
  const cookieStore = cookies();
  const shopId = cookieStore.get('shopId');
  const shopInfo = await getShopInfo(shopId?.value as string);
  console.log(shopInfo?.data.shop);

  return (
    <div className="w-full h-full flex flex-col gap-space16">
      <div className="flex items-center justify-between gap-space16 flex-wrap">
        <article className="space-y-space4">
          <PageTitle title={shopInfo?.data?.shop?.name ?? ''} />
          <Text
            title={shopInfo?.data?.shop?.address ?? ''}
            className="text-sm"
            variant="secondary"
          />
        </article>

        <ShopActions slug={shopInfo?.data?.shop?.slug ?? ''} />
      </div>

      <div className="flex justify-center flex-wrap gap-space12">
        <Card className="w-full max-w-[14rem] h-[12rem] flex flex-col items-center justify-center gap-space8">
          <Text title="Active order" variant="secondary" />
          <Text
            title={shopInfo?.data?.shop?.active_order ?? ''}
            className="font-bold text-xl"
          />
        </Card>

        <Card className="w-full max-w-[14rem] h-[12rem] flex flex-col items-center justify-center gap-space8">
          <Text title="Processing" variant="secondary" />
          <Text
            title={shopInfo?.data?.shop?.online_product ?? ''}
            className="font-bold text-xl"
          />
        </Card>

        <Card className="w-full max-w-[14rem] h-[12rem] flex flex-col items-center justify-center gap-space8">
          <Text title="Delivered" variant="secondary" />
          <Text
            title={shopInfo?.data?.shop?.active_order ?? ''}
            className="font-bold text-xl"
          />
        </Card>

        <Card className="w-full max-w-[14rem] h-[12rem] flex flex-col items-center justify-center gap-space8">
          <Text title="Total Income" variant="secondary" />
          <Text
            title={shopInfo?.data?.shop?.total_earning ?? ''}
            className="font-bold text-xl"
          />
        </Card>

        <Card className="w-full max-w-[14rem] h-[12rem] flex flex-col items-center justify-center gap-space8">
          <Text title="Online Product" variant="secondary" />
          <Text
            title={shopInfo?.data?.shop?.online_product ?? ''}
            className="font-bold text-xl"
          />
        </Card>
      </div>
      <div className="flex justify-center flex-wrap gap-space16">
        {overviewOther.map((item) => (
          <Link
            href={item.url}
            key={item.title}
            className="w-full max-w-[24rem]"
          >
            <Card className="h-full max-h-[12rem] p-5 flex flex-col items-center justify-center gap-space8">
              <Image src={item.img} alt="" height={48} width={48} />
              <Text title={item.title} variant="secondary" />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Overview;

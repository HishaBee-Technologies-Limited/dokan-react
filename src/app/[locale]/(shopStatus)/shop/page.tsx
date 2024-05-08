import { getAllShops } from '@/actions/shop/getAllShops';

import ShopUi from '@/components/shop/ShopUi';
import { IShopResponse } from '@/types/shop';

const SwitchShopPage = async () => {
  const shops = await getAllShops();

  console.log(shops);
  return <ShopUi shops={shops?.data as IShopResponse[]} />;
};

export default SwitchShopPage;

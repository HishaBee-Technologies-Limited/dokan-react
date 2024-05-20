'use server';

import { authApi } from '@/lib/api';
import { shopPayload } from '@/types/shop';

export const createShops = async ({
  area,
  type,
  address,
  name,
  publicData,
  shop_image,
}: shopPayload) => {
  try {
    const payload = {
      name,
      address,
      area,
      type,
      publicData,
      shop_image,
    };
    const res = await authApi.get(
      `/shop/create?name=${name}&type=${type}&address=${address}&area=${area}&public=${publicData}`
    );
    console.log('shop-create------', res);

    const data = await res.json();

    console.log('shop-create------', data);

    if (res.ok) {
      return {
        success: true,
        status: data?.code,
        data: data,
      };
    }
    if (!res.ok) {
      return { success: false, error: data };
    }
  } catch {
    return { success: false, error: 'Something went wrong' };
  }
};

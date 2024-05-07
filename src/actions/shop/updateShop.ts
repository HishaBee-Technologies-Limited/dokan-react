'use server';

import { authApi } from '@/lib/api';
import { shopPayload } from '@/types/shop';

export const updateShop = async ({
  shopId,
  area,
  type,
  address,
  name,
  number,
  shop_image,
}: shopPayload) => {
  try {
    const payload = {
      shop_id: shopId,
      area,
      type,
      address,
      name,
      number,
      shop_image,
    };
    const res = await authApi.put(`/shop/edit/${shopId}`, payload);
    const data = await res.json();

    if (res.ok) {
      return {
        success: true,
        status: data?.code,
        data: data,
      };
    }
    if (!res.ok) {
      console.log(data);
      return { success: false, error: data };
    }
  } catch {
    return { success: false, error: 'Something went wrong' };
  }
};

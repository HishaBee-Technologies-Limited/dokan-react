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
    const res = await authApi.post(`/shop/create`, payload);
    const data = await res.json();

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

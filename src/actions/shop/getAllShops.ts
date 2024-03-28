'use server';

import { authApi } from '@/lib/api';
import { IShopResponse } from '@/types/shop';

export const getAllShops = async () => {
  try {
    const res = await authApi.get('/shop/all');
    const data = await res.json();

    if (res.ok) {
      return {
        success: true,
        status: data?.code,
        data: data.data as IShopResponse[],
      };
    }
    if (!res.ok) {
      return { success: false, error: data };
    }
  } catch {
    return { success: false, error: 'Something went wrong' };
  }
};

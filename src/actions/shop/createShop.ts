'use server';

import { authApi } from '@/lib/api';
import { IShopResponse, shopPayload } from '@/types/shop';

export const createShops = async ({
  area,
  type,
  address,
  name,
  publicData,
}: shopPayload) => {
  try {
    const res = await authApi.get(
      `/shop/create?name=${name}&type=${type}&address=${address}&area=${area}&public=${publicData}`
    );
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

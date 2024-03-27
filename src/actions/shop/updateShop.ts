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
}: shopPayload) => {
  try {
    const res = await authApi.get(
      `/shop/edit?shop_id=${shopId}&name=${name}&type=${type}&address=${address}&public_number=${number}&area=${area}`
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

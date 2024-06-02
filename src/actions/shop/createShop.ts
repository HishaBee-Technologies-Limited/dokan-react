'use server';

import { authApi } from '@/lib/api';
import { shopPayload } from '@/types/shop';

export const createShops = async ({
  area,
  type,
  address,
  name,
  publicData,
  logo_url,
}: shopPayload) => {
  try {
    const res = await authApi.get(
      `/shop/create?name=${name}&type=${type}&address=${address}&area=${area}&public=${publicData}&logo_url=${logo_url}`
    );

    const data = await res.json();
    console.log(res, data);
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

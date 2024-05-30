'use server';

import { authApi } from '@/lib/api';
import { shopPayload } from '@/types/shop';

export const updateShop = async ({
  shopId,
  area,
  type,
  address,
  name,
  public_number,
  logo_url,
}: any) => {
  try {
    const payload = new URLSearchParams({
      shop_id: shopId,
      area,
      type,
      address,
      name,
      public_number,
      logo_url,
    });

    const res = await authApi.get(`/shop/edit?${payload}`);
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

'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';
import { IProductPayload } from '@/types/product';
import { IProductPurchasePayload } from '@/types/purchase';
import { IDueCreateItem } from '@/types/due/dueResponse';

export const createDueItem = async (payload: any) => {
  try {
    const shopId = cookies().get('shopId')?.value;

    const params = new URLSearchParams({
      shop_id: shopId,
      ...payload,
    });

    console.log(params);

    const res = await authApi.post(`/due_item/add?${params}`);
    const data = await res.json();

    if (res.ok) {
      return {
        success: true,
        status: data?.status_code,
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

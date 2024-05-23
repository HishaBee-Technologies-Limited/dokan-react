'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';
import { IProductPayload } from '@/types/product';
import {
  IProductItemPurchasePayload,
  IProductPurchasePayload,
} from '@/types/purchase';
import { IProductItemSellPayload } from '@/types/sell';

export const addQuickSell = async ({
  created_at,

  transaction_unique_id,

  price,
  unique_id,
  updated_at,
  version,
  status,
}: any) => {
  try {
    const shopId = cookies().get('shopId')?.value;
    console.log(transaction_unique_id);

    const payload = {
      shop_id: Number(shopId),
      created_at,
      transaction_unique_id,
      price,
      unique_id,
      updated_at,
      version,
      //   profit,
      status,
    };

    const res = await authApi.post(`/quick_sell`, payload);
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

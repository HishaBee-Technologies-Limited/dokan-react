'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';
import { IProductPayload } from '@/types/product';
import {
  IProductItemPurchasePayload,
  IProductPurchasePayload,
} from '@/types/purchase';
import { IProductItemSellPayload } from '@/types/sell';

export const sellItemCreate = async ({
  created_at,
  name,
  quantity,
  unit_price,
  unit_cost,
  transaction_unique_id,
  shop_product_id,
  shop_product_variance_id,
  purchase_id,
  price,
  unique_id,
  updated_at,
  version,
  profit,
  status,
  shop_product_unique_id,
}: any) => {
  try {
    const shopId = cookies().get('shopId')?.value;

    const payload = new URLSearchParams({
      shop_id: shopId!,
      created_at,
      name,
      quantity,
      unit_price,
      unit_cost,
      transaction_unique_id,
      shop_product_id,
      shop_product_variance_id,
      purchase_id,
      price,
      unique_id,
      updated_at,
      version,
      profit,
      status,
      shop_product_unique_id,
    });

    const res = await authApi.post(`/transaction_item?${payload}`);
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

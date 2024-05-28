'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';
import { IProductPurchasePayload } from '@/types/purchase';
import { revalidatePath } from 'next/cache';

export const deleteTransaction = async ({
  created_at,

  unique_id,
  updated_at,
  version,
  payment_method,
  total_item,
  total_price,
  user_id,
}: {
  created_at: IProductPurchasePayload['created_at'];
  unique_id: IProductPurchasePayload['unique_id'];
  version: IProductPurchasePayload['version'];
  updated_at: IProductPurchasePayload['updated_at'];
  total_item: IProductPurchasePayload['payment_method'];
  total_price: IProductPurchasePayload['total_item'];
  payment_method: IProductPurchasePayload['total_price'];
  user_id: IProductPurchasePayload['user_id'];
}) => {
  try {
    const shopId = cookies().get('shopId')?.value;

    const payload = {
      shop_id: Number(shopId),

      unique_id: unique_id,

      created_at: created_at,
      updated_at: updated_at,
      version: version,
      payment_method,
      total_item,
      total_price,
      user_id,
    };

    const res = await authApi.post(`/transaction`, payload);
    const data = await res.json();
    revalidatePath('/purchase-list');

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

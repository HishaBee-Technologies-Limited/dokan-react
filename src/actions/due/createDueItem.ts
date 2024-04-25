'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';
import { IProductPayload } from '@/types/product';
import { IProductPurchasePayload } from '@/types/purchase';
import { IDueCreate } from '@/types/due/dueResponse';

export const createDueItem = async ({
  amount,
  unique_id,
  due_left,
  version,
  updated_at,
  created_at,
  message,
  contact_mobile,
  contact_type,
  contact_name,
  sms,
}: IDueCreate) => {
  try {
    const shopId = cookies().get('shopId')?.value;

    const payload: IDueCreate = {
      shop_id: Number(shopId),
      amount,
      unique_id,
      due_left,
      version,
      updated_at,
      created_at,
      message,
      contact_mobile,
      contact_type,
      contact_name,
      sms,
    };

    const res = await authApi.post(`/due_item/add`, payload);
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

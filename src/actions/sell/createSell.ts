'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';
import { IProductPurchasePayload } from '@/types/purchase';
import { IProductSellPayload } from '@/types/sell';
import { revalidatePath } from 'next/cache';

export const createSell = async ({
  created_at,
  discount,
  discount_type,
  employee_mobile,
  employee_name,
  note,
  payment_method,
  payment_status,
  purchase_barcode,
  received_amount,
  shop_id,
  customer_mobile,
  customer_name,
  total_item,
  total_price,
  unique_id,
  updated_at,
  user_id,
  version,
  total_discount,
  change_amount,
  customer_address,
  total_profit,
  transaction_type,
}: IProductSellPayload) => {
  try {
    const shopId = cookies().get('shopId')?.value;

    const payload: IProductSellPayload = {
      shop_id: Number(shopId),
      unique_id: unique_id,
      discount: discount,
      employee_mobile: employee_mobile,
      employee_name: employee_name,
      note: note,
      payment_method: payment_method,
      created_at: created_at,
      updated_at: updated_at,
      version: version,
      payment_status: payment_status,
      purchase_barcode: purchase_barcode,
      received_amount: received_amount,
      customer_mobile,
      customer_name,
      total_item: total_item,
      total_price: total_price,
      user_id: user_id,
      discount_type,
      total_discount,
      change_amount,
      customer_address,
      total_profit,
      transaction_type,
    };

    const res = await authApi.post(`/transaction`, payload);
    const data = await res.json();
    revalidatePath('/sell-list');

    console.log(data);

    if (res.ok) {
      if (data.code !== 200) {
        return { success: false, error: data };
      } else {
        return {
          success: true,
          status: data?.code,
          data: data,
        };
      }
    }
    if (!res.ok) {
      return { success: false, error: data };
    }
  } catch {
    return { success: false, error: 'Something went wrong' };
  }
};

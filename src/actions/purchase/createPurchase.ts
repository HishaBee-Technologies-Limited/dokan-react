'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';
import { IProductPayload } from '@/types/product';
import { IProductPurchasePayload } from '@/types/purchase';
import { revalidatePath } from 'next/cache';
import { logger } from '../../../Pino';

export const createPurchase = async ({
  batch,
  created_at,
  date,
  discount,
  discount_type,
  employee_mobile,
  employee_name,
  extra_charge,
  note,
  payment_method,
  payment_status,
  purchase_barcode,
  received_amount,
  shop_id,
  supplier_mobile,
  supplier_name,
  total_item,
  total_price,
  unique_id,
  updated_at,
  user_id,
  version,
  sms,
}: IProductPurchasePayload) => {
  try {
    const shopId = cookies().get('shopId')?.value;

    const payload: IProductPurchasePayload = {
      shop_id: Number(shopId),
      batch: batch,
      date: date,
      unique_id: unique_id,
      discount: discount,
      employee_mobile: employee_mobile,
      employee_name: employee_name,
      extra_charge: extra_charge,
      note: note,
      payment_method: payment_method,
      created_at: created_at,
      updated_at: updated_at,
      version: version,
      payment_status: payment_status,
      purchase_barcode: purchase_barcode,
      received_amount: received_amount,
      supplier_mobile: supplier_mobile,
      supplier_name: supplier_name,
      total_item: total_item,
      total_price: total_price,
      user_id: user_id,
      discount_type: discount_type,
      sms: sms,
    };
    console.log(JSON.stringify(payload, null, 4));
    const res = await authApi.post(`/purchase`, payload);
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

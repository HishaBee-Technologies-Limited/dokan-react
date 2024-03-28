'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';
import { IProductPayload } from '@/types/product';
import { IProductPurchasePayload } from '@/types/purchase';

export const createPurchase = async (args: IProductPurchasePayload) => {
  try {
    const shopId = cookies().get('shopId')?.value;

    const payload: IProductPurchasePayload = {
      shop_id: Number(shopId),
      batch: args.batch,
      date: args.date,
      unique_id: args.unique_id,
      discount: args.discount,
      employee_mobile: args.employee_mobile,
      employee_name: args.employee_name,
      extra_charge: args.extra_charge,
      note: args.note,
      payment_method: args.payment_method,
      created_at: args.created_at,
      updated_at: args.updated_at,
      version: args.version,
      payment_status: args.payment_status,
      purchase_barcode: args.purchase_barcode,
      received_amount: args.received_amount,
      supplier_mobile: args.supplier_mobile,
      supplier_name: args.supplier_name,
      total_item: args.total_item,
      total_price: args.total_price,
      user_id: args.user_id,
    };

    const res = await authApi.post(`/purchase`, payload);
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

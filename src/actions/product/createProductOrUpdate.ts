'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';
import { IProductPayload } from '@/types/product';

export const createProductOrUpdate = async ({
  unique_id,
  id,
  sub_category,
  name,
  selling_price,
  cost_price,
  stock,
  description,
  vat_applicable,
  vat_percent,
  gallery,
  product_type,
  barcode,
  sell_online,
  shipping_cost,
  wholesale_price,
  wholesale_amount,
  stock_alert,
  warranty,
  warranty_type,
  discount,
  discount_type,
  created_at,
  updated_at,
  version,
  prevent_stock_item,
  delivery_charge_id,
  weight,
  unit,
}: IProductPayload) => {
  try {
    const shopId = cookies().get('shopId')?.value;

    // console.log(uniqueId);

    const payload = {
      shop_id: Number(shopId),
      ...(unique_id && { unique_id }),
      ...(id && { id }),
      ...(sub_category && { sub_category }),
      ...(name && { name }),
      ...(selling_price && { selling_price }),
      ...(cost_price && { cost_price }),
      ...(stock && { stock }),
      ...(description && { description }),
      ...(vat_applicable && { vat_applicable }),
      ...(vat_percent && { vat_percent }),
      ...(gallery && { gallery }),
      ...(product_type && { product_type }),
      ...(barcode && { barcode }),
      ...(sell_online && { sell_online }),
      ...(shipping_cost && { shipping_cost }),
      ...(wholesale_price && { wholesale_price }),
      ...(wholesale_amount && { wholesale_amount }),
      ...(stock_alert && { stock_alert }),
      ...(warranty && { warranty }),
      ...(warranty_type && { warranty_type }),
      ...(discount && { discount }),
      ...(discount_type && { discount }),
      ...(created_at && { created_at }),
      ...(updated_at && { updated_at }),
      ...(version && { version }),
      ...(prevent_stock_item && { prevent_stock_item }),
      ...(delivery_charge_id && { delivery_charge_id }),
      ...(weight && { weight }),
      ...(unit && { unit }),
    };

    console.log(payload);

    const res = await authApi.post(`/product`, payload);
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

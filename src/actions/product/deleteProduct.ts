'use server';

import { authApi } from '@/lib/api';
import { DATE_FORMATS } from '@/lib/constants/common';
import { DEFAULT_DELETE_VERSION } from '@/lib/constants/product';
import { formatDate } from '@/lib/utils';
import { IProduct, IProductPayload } from '@/types/product';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const deleteProduct = async (product: IProduct) => {
  try {
    const shopId = cookies().get('shopId')?.value;

    const res = await authApi.post(
      `/product?product_type=${product.product_type}&selling_price=${product.selling_price}&name=${product.name}&shop_id=${shopId}&unique_id=${product.unique_id}&version=${DEFAULT_DELETE_VERSION}&updated_at=${formatDate(DATE_FORMATS.default)}&created_at=${product.created_at}`
    );
    const data = await res.json();

    revalidatePath('/product');

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

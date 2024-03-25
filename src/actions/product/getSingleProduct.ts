'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';

export const getSingleProduct = async (uniqueId: string) => {
  try {
    const shopId = cookies().get('shopId')?.value;

    console.log(uniqueId);

    const res = await authApi.get(`/product/${uniqueId}?shop_id=${1885}`);
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

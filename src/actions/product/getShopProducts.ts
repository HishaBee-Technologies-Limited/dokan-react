'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';

export const getShopsProducts = async (page?: number, category?: boolean) => {
  const CATEGORY = category ? category : true;
  const pageCount = page ? page : 1;
  try {
    const shopId = cookies().get('shopId')?.value;
    const res = await authApi.get(
      `/product/all?shop_id=${shopId}&page=${pageCount}&category=${CATEGORY}`
    );
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

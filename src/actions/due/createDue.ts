'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';

export const createDue = async (payload: any) => {
  try {
    const shopId = cookies().get('shopId')?.value;

    const params = new URLSearchParams({
      shop_id: shopId,
      ...payload,
    });
    console.log('due', params);
    const res = await authApi.post(`/due/add?${params}`);
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

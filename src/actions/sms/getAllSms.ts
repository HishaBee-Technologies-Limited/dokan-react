'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';

export const getAllSms = async () => {
  try {
    const shopId = cookies().get('shopId')?.value;

    const res = await authApi.get(`/sms?shop_id=${shopId}`);
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
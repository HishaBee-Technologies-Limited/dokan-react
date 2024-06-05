'use server';

import { authApi } from '@/lib/api';
import { IDueItemsResponse } from '@/types/due/dueResponse';
import { cookies } from 'next/headers';

export const getUserDue = async (mobile: string) => {
  try {
    const shopId = cookies().get('shopId')?.value;
    const res = await authApi.get(`/due/${shopId}/${mobile}`);
    const data = await res.json();
    console.log(res.status);
    if (res.ok) {
      return {
        success: true,
        status_code: data.status_code,
        message: data.message,
        data: data as IDueItemsResponse[],
      };
    }
    if (!res.ok) {
      return { success: false, error: { status: res.status } };
    }
  } catch {
    return { success: false, error: 'Something went wrong' };
  }
};

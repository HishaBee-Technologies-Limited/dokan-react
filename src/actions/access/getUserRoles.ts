'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';

export const getUserRoles = async (userId: string) => {
  try {
    const shopId = cookies().get('shopId')?.value;
    const res = await authApi.get(
      `/role/user?shop_id=${shopId}&user_id=${userId}`
    );

    const data = await res.json();

    if (res.ok) {
      return {
        success: true,
        message: data.message,
        status_code: data.status_code,
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

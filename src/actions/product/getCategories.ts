'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';

export const getCategories = async (userId: string) => {
  try {
    const res = await authApi.get(`/product/categories?user_id=${userId}
    `);
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

'use server';

import { authApi } from '@/lib/api';

export const getSingleExpense = async (id?: string) => {
  try {
    const res = await authApi.get(`/expense/${id}?exclude_deleted=true`);
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

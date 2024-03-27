'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';

export const getUnits = async () => {
  try {
    const res = await authApi.get(`/units`);
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

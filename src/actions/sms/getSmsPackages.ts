'use server';

import { authApi } from '@/lib/api';

export const getSmsPackages = async () => {
  try {
    const res = await authApi.get(`/sms/packages`);
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

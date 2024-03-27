'use server';

import { authApi } from '@/lib/api';

export const getAreaInfo = async (areaId: string) => {
  try {
    const res = await authApi.get(`/area/${areaId}`);
    const data = await res.json();

    if (res?.ok) {
      return { success: true, status: data.code, data: data };
    }
    if (!res?.ok) {
      return { success: false, error: data };
    }
  } catch (error) {
    return { success: false, error: 'Something went wrong' };
  }
};

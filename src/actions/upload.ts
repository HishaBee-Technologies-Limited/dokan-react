'use server';

import { uploadApi } from '@/lib/api';

export const filesUpload = async (payload: any) => {
  try {
    const res = await uploadApi.post(`/upload`, payload);
    const data = await res.json();

    if (res.ok) {
      return {
        success: true,
        status: data?.code,
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

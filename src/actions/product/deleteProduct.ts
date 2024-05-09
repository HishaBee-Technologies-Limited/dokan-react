'use server';

import { authApi } from '@/lib/api';
import { IProductPayload } from '@/types/product';

export const deleteProduct = async ({
  unique_id,
}: {
  unique_id: IProductPayload['unique_id'];
}) => {
  try {
    const res = await authApi.delete(`/product${unique_id}`);
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

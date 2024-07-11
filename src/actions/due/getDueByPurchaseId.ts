'use server';

import { authApi } from '@/lib/api';

export const getDueByPurchaseId = async (
  unique_id: string,
  purchaseId: string,
  exclude_deleted?: boolean
) => {
  const exclude = exclude_deleted ? exclude_deleted : true;

  try {
    const params = `purchase_unique_id=${unique_id}&exclude_deleted=${exclude}&purchase_id=${purchaseId}`;
    const res = await authApi.get(`/purchase/due_item?${params}`);
    const data = await res.json();

    if (res.ok) {
      return {
        success: true,
        status_code: data.status_code,
        message: data.message,
        data: data as any,
        metadata: data.metadata,
      };
    }
    if (!res.ok) {
      return { success: false, error: data };
    }
  } catch {
    return { success: false, error: 'Something went wrong' };
  }
};

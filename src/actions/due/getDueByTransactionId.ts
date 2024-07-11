'use server';

import { authApi } from '@/lib/api';
import { IDueItemsResponse } from '@/types/due/dueResponse';
// import { cookies } from 'next/headers';

export const getDueByTransactionId = async (
  unique_id: string,
  transactionId: string,
  exclude_deleted?: boolean
) => {
  const exclude = exclude_deleted ? exclude_deleted : true;

  try {
    // const shopId = cookies().get('shopId')?.value;

    const params = `transaction_unique_id=${unique_id}&exclude_deleted=${exclude}&transaction_id=${transactionId}`;
    const res = await authApi.get(`/transaction/due_item?${params}`);
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

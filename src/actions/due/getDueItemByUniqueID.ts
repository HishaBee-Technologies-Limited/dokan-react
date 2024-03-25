'use server';

import { authApi } from '@/lib/api';
import { IDueItemsResponse } from '@/types/due/dueResponse';

export const getDueItemByUniqueID = async (
  unique_id: string,
  exclude_deleted?: boolean
) => {
  const exclude = exclude_deleted ? exclude_deleted : true;

  try {
    const params = `unique_id=${unique_id}&exclude_deleted=${exclude}`;
    const res = await authApi.get(`/due/items?${params}`);
    const data = await res.json();

    if (res.ok) {
      return {
        success: true,
        status_code: data.status_code,
        message: data.message,
        data: data.data as IDueItemsResponse[],
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

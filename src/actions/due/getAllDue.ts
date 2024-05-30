'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';
import { IDueListResponse } from '@/types/due/dueResponse';
import { ICommonGetResponse } from '@/types/common';

export const getAllDue = async (page?: number) => {
  const pageCount = page ? page : 10;
  try {
    const shopId = cookies().get('shopId')?.value;
    const params = `shop_id=${shopId}&per_page=${pageCount}&exclude_deleted=true`;
    const res = await authApi.get(`/due/all?${params}`);
    const data = await res.json();
    // console.log(data);
    if (res.ok) {
      return {
        success: true,
        message: data.message,
        status_code: data.status_code,
        data: data as ICommonGetResponse<IDueListResponse>,
        // metadata: {
        //   total_get: data.metadata.total_get,
        //   total_give: data.metadata.total_give,
        // },
      };
    }
    if (!res.ok) {
      return { success: false, error: data };
    }
  } catch {
    return { success: false, error: 'Something went wrong' };
  }
};

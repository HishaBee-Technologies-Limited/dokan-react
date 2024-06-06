'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';
import { IDueListResponse } from '@/types/due/dueResponse';
import { ICommonGetResponse } from '@/types/common';

export const getAllDue = async ({
  page,
  contact_type,
}: {
  page?: number;
  contact_type?: string;
}) => {
  try {
    const shopId = cookies().get('shopId')?.value;
    const res = await authApi.get(
      `/due/all?${new URLSearchParams({
        per_page: '20',
        exclude_deleted: 'true',
        shop_id: shopId?.toString() ?? '',
        page: page?.toString() ?? '1',
        ...(contact_type && { contact_type }),
      })}`
    );
    const data = await res.json();
    if (res.ok) {
      return {
        success: true,
        message: data.message,
        status_code: data.status_code,
        data: data as ICommonGetResponse<IDueListResponse>,
      };
    }
    if (!res.ok) {
      return { success: false, error: data };
    }
  } catch {
    return { success: false, error: 'Something went wrong' };
  }
};

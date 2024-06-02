'use server';
import { ICommonGetResponse } from '@/types/common';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';
import { IPurchaseHistoryResponse } from '@/types/purchase';
import { format, sub } from 'date-fns';
import { DATE_FORMATS } from '@/lib/constants/common';
import { formatDate } from '@/lib/utils';

export const getPurchaseHistory = async (
  page?: number,
  startDate?: string,
  endDate?: string
) => {
  const pageCount = page ? page : 1;
  try {
    const shopId = cookies().get('shopId')?.value;
    const DEFAULT_PAGE_ITEMS = '10';

    const params = new URLSearchParams({
      shop_id: String(shopId),
      page: String(pageCount),
      start_date:
        startDate ??
        format(sub(new Date(), { days: 30 }), DATE_FORMATS.default),
      end_date: endDate ?? formatDate(DATE_FORMATS.default),
      per_page: DEFAULT_PAGE_ITEMS,
      exclude_deleted: 'true',
    });
    const res = await authApi.get(`/purchase?${params}`);
    const data = await res.json();

    if (res.ok) {
      return {
        success: true,
        message: data.message,
        status_code: data.status_code,
        data: data as ICommonGetResponse<IPurchaseHistoryResponse>,
      };
    }
    if (!res.ok) {
      return { success: false, error: data };
    }
  } catch {
    return { success: false, error: 'Something went wrong' };
  }
};

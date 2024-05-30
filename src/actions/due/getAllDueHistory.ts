'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';
import { IDueItemsResponse } from '@/types/due/dueResponse';
import { format, subMonths } from 'date-fns';

interface IGetAllDueHistory {
  page?: number;
  start_date: string;
  end_date: string;
}

export const getAllDueHistory = async (params: IGetAllDueHistory) => {
  const { page, start_date, end_date } = params;
  const today = new Date();

  const startDate =
    start_date ?? format(subMonths(today, 1), 'yyyy-MM-dd hh:mm:ss');
  const endDate = end_date ?? today;

  const now = new Date();

  try {
    const shopId = cookies().get('shopId')?.value;
    const params = `shop_id=${shopId}&start_date=${format(subMonths(today, 1), 'yyyy-MM-dd hh:mm:ss')}&end_date=${endDate}&exclude_deleted=true`; //&page=${page}
    const res = await authApi.get(`/due/history?${params}`);
    const data = await res.json();

    if (res.ok) {
      return {
        success: true,
        message: data.message,
        status_code: data.status_code,
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

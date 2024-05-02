'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';

export const getCategories = async (page?: number) => {
  const pageCount = 100;
  const currentPage = page ? page : 1;
  try {
    const shopId = cookies().get('shopId')?.value;
    const params = `shop_id=${shopId}&per_page=${pageCount}&page=${currentPage}`;
    const res = await authApi.get(`/expense_category?${params}`);
    const data = await res.json();

    if (res.ok) {
      return {
        success: true,
        message: data.message,
        status_code: data.status_code,
        data: data.data,
      };
    }
    if (!res.ok) {
      return { success: false, error: data };
    }
  } catch {
    return { success: false, error: 'Something went wrong' };
  }
};

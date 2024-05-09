'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';

export const createExpenseCategory = async ({
  name,
  id,
}: {
  name: string;
  id?: string;
}) => {
  try {
    const shopId = cookies().get('shopId')?.value;
    const payload = {
      shop_id: Number(shopId),
      name,
      id,
    };
    const res = await authApi.post(`/expense_category`, payload);
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

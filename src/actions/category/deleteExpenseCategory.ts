'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';

export const deleteExpenseCategory = async ({
  name,
  id,
}: {
  name: string;
  id?: string;
}) => {
  try {
    const shopId = cookies().get('shopId')?.value;

    const res = await authApi.delete(`/expense_category/${id}`);
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

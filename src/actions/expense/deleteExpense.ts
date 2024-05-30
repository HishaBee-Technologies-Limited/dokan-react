'use server';

import { authApi } from '@/lib/api';
import { IExpense } from '@/types/expense';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const deleteExpense = async (id: string) => {
  try {
    const shopId = cookies().get('shopId')?.value;

    const res = await authApi.delete(`/expense/delete?id=${id}`);
    const data = await res.json();

    revalidatePath('/expense');

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

'use server';

import { authApi } from '@/lib/api';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const editExpenseCategory = async ({
  name,
  id,
}: {
  name: string;
  id: string;
}) => {
  try {
    const shopId = cookies().get('shopId')?.value ?? '';
    const payload = new URLSearchParams({
      shop_id: shopId,
      name,
      id,
    });
    const res = await authApi.put(`/expense_category?${payload}`);
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

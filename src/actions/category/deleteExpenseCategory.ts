'use server';

import { authApi } from '@/lib/api';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const deleteExpenseCategory = async ({
  name,
  id,
}: {
  name?: string;
  id?: string;
}) => {
  try {
    const shopId = cookies().get('shopId')?.value;

    const res = await authApi.delete(`/expense_category?id=${id}`);
    console.log(res);
    const data = await res.json();
    console.log(data);
    revalidatePath('/expense');

    if (res.ok) {
      return {
        success: true,
        message: data.message,
      };
    }
    if (!res.ok) {
      return { success: false, error: data };
    }
  } catch {
    return { success: false, error: 'Something went wrong' };
  }
};

'use server';

import { authApi } from '@/lib/api';
import { IExpense } from '@/types/expense';
import { cookies } from 'next/headers';

export const editExpense = async (
  id: string,
  {
    amount,
    type,
    purpose,
    image,
    details,
    image_changed,
    created_at,
    version,
    unique_id,
    updated_at,
  }: IExpense
) => {
  try {
    const shopId = cookies().get('shopId')?.value;

    const payload = {
      shop_id: Number(shopId),
      id,
      amount,
      type,
      purpose,
      image,
      details,
      image_changed,
      created_at,
      version,
      unique_id,
      updated_at,
    };
    const res = await authApi.put(`/expenses/${id}`, payload);
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

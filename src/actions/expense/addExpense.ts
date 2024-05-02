'use server';

import { authApi } from '@/lib/api';
import { IExpense } from '@/types/expense';
import { cookies } from 'next/headers';

export const addExpense = async ({
  amount,
  type,
  purpose,
  image,
  details,
  image_changed,
  created_at,
  version,
  updated_at,
  unique_id,
}: IExpense) => {
  try {
    const shopId = cookies().get('shopId')?.value;

    const payload = {
      shop_id: Number(shopId),
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
    const res = await authApi.post(`/expenses`, payload);
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

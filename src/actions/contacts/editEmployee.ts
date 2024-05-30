'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';
import { IUserRequest } from '@/types/contact/partyRequest';
import { revalidatePath } from 'next/cache';

export const editEmployee = async (payload: any) => {
  const shopId = cookies().get('shopId')?.value;

  const updatedPayload = new URLSearchParams({
    ...payload,
    monthly_salary: payload.salary_amount,
    shop_id: Number(shopId),
  });

  try {
    const res = await authApi.get(`/employee/edit?${updatedPayload}`);
    const data = await res.json();

    revalidatePath('/contact');

    if (res.ok) {
      return {
        success: true,
        status: data?.code,
        data: data as IUserRequest,
      };
    }
    if (!res.ok) {
      return { success: false, error: data };
    }
  } catch {
    return { success: false, error: 'Something went wrong' };
  }
};

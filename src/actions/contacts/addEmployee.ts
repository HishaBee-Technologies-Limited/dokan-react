'use server';

import { authApi } from '@/lib/api';
import { IUserRequest } from '@/types/contact/partyRequest';
import { cookies } from 'next/headers';

export const addEmployee = async (payload: any) => {
  const shopId = cookies().get('shopId')?.value;

  const updatedPayload = new URLSearchParams({
    ...payload,
    shop_id: Number(shopId),
  });

  try {
    const res = await authApi.get(`/employee/add?${updatedPayload}`);
    const data = await res.json();

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

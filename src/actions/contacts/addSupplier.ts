'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';
import { IUserRequest } from '@/types/contact/partyRequest';

export const addSupplier = async (payload: IUserRequest) => {
  const shopId = cookies().get('shopId')?.value;

  const updatedPayload = {
    ...payload,
    shop_id: Number(shopId),
  };

  try {
    const res = await authApi.post(`/suppliers`, updatedPayload);
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

'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';
import { IUserRequest } from '@/types/contact/partyRequest';

export const addSupplier = async (payload: any) => {
  const shopId = cookies().get('shopId')?.value;

  const updatedPayload = new URLSearchParams({
    ...payload,
    shop_id: Number(shopId),
  });
  console.log(updatedPayload);
  console.log(shopId);

  try {
    const res = await authApi.get(`/supplier/add?${updatedPayload}`);
    const data = await res.json();
    console.log(res);

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
  } catch (error) {
    console.log(error);
    return { success: false, error: 'Something went wrong' };
  }
};

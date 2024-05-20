'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';
import { IUserRequest } from '@/types/contact/partyRequest';

export const editCustomer = async (payload: any) => {
  const shopId = cookies().get('shopId')?.value;

  const updatedPayload = new URLSearchParams({
    ...payload,
    shop_id: shopId,
  });

  console.log(updatedPayload);

  try {
    const res = await authApi.get(`/customer/edit?${updatedPayload}`);
    console.log(res);
    const data = await res.json();
    console.log(data);

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

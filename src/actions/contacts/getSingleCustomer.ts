'use server';

import { authApi } from '@/lib/api';
import { IUserResponse } from '@/types/contact/partyResponse';

export const getSingleCustomer = async (id: number) => {
  try {
    const res = await authApi.get(`/customer/transaction/0${id}`);
    const data = await res.json();

    if (res.ok) {
      return {
        success: true,
        message: data.message,
        status: data.status_code,
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

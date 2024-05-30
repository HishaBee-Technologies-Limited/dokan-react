'use server';

import { authApi } from '@/lib/api';
import { IUserResponse } from '@/types/contact/partyResponse';

export const getAllCustomer = async (shopId: number) => {
  try {
    const res = await authApi.get(
      `/customer/all?shop_id=${shopId}&exclude_deleted=true`
    );
    const data = await res.json();
    if (res.ok) {
      return {
        success: true,
        message: data.message,
        status: data.status_code,
        data: data as IUserResponse[],
      };
    }
    if (!res.ok) {
      return { success: false, error: data };
    }
  } catch {
    return { success: false, error: 'Something went wrong' };
  }
};

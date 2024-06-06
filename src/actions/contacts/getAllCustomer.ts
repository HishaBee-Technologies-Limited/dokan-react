'use server';
import { ICommonGetResponse } from '@/types/common';

import { authApi } from '@/lib/api';
import { IUserResponse } from '@/types/contact/partyResponse';
import { cookies } from 'next/headers';

export const getAllCustomer = async (page: number) => {
  try {
    const shopId = cookies().get('shopId')?.value;

    const res = await authApi.get(
      `/customer/all?${new URLSearchParams({
        page: page.toString(),
        per_page: '20',
        exclude_deleted: 'true',
        shop_id: shopId!,
      })}`
    );
    const data = await res.json();
    if (res.ok) {
      return {
        success: true,
        message: data.message,
        status: data.status_code,
        data: data as ICommonGetResponse<IUserResponse>,
      };
    }
    if (!res.ok) {
      return { success: false, error: data };
    }
  } catch {
    return { success: false, error: 'Something went wrong' };
  }
};

'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export const sendSMS = async ({
  number,
  message,
  sms_count,
}: {
  number: string;
  message: string;
  sms_count: string;
}) => {
  try {
    const shopId = cookies().get('shopId')?.value;

    const params = new URLSearchParams({
      shop_id: shopId!,
      number,
      message,
      sms_count,
    });
    console.log(params);
    const res = await authApi.post(`/sms/add?${params}`);
    const data = await res.json();
    revalidatePath('/sms');
    if (res.ok) {
      return {
        success: true,
        status: data?.status_code,
        data: data,
      };
    }
    if (!res.ok) {
      return { success: false, error: data };
    }
  } catch {
    return { success: false, error: 'Something went wrong' };
  }
};

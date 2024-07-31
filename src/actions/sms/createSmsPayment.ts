'use server';

import { ISMSPackage } from '@/app/[locale]/(dashboard)/sms/packages/page';
import { authApi, paymentApi } from '@/lib/api';
import { cookies } from 'next/headers';

export const createSmsPayment = async (pkg: ISMSPackage) => {
  try {
    const shopId = cookies().get('shopId')?.value;
    console.log(pkg);
    const payload = {
      type: 'SMS',
      type_id: pkg.id,
      amount: pkg.price,
      shop_id: shopId,
      callback_fail: 'https://web.hishabee.business/sms',
      callback_success: 'https://web.hishabee.business/sms',
    };

    const res = await paymentApi.post(`payment/create`, payload);
    const data = await res.json();

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

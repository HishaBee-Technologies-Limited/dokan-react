'use server';

import { authApi } from '@/lib/api';
import { IShopResponse } from '@/types/shop';

export const getAllShops = async () => {
  console.log('----');
  try {
    const res = await authApi.get('/shop/all');
    // if (res.status === 401) {
    //   cookies().delete('authjs.session-token');
    //   redirect('/');
    // }
    console.log('----', res);
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      return {
        success: true,
        status: data?.code,
        data: data.data as IShopResponse[],
      };
    }
    if (!res.ok) {
      return { success: false, error: data };
    }
  } catch {
    return { success: false, error: 'Something went wrong' };
  }
};

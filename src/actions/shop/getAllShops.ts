'use server';

import { authApi } from '@/lib/api';
import { IShopResponse } from '@/types/shop';
import { logout } from '../logout';
import { signOut } from '@/auth';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export const getAllShops = async () => {
  try {
    const res = await authApi.get('/shop/all');
    if (res.status === 401) {
      cookies().delete('authjs.session-token');
      redirect('/');
    }

    const data = await res.json();
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

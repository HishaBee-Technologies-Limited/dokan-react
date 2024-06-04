'use server';
import { api, authApi } from '@/lib/api';

export const checkSubscription = async ({ shopId }: { shopId: string }) => {
  const res = await authApi.get(`/subscription/verify?shop_id=${shopId}`);

  const data = await res.json();
  if (res.ok) {
    return { success: true, status: data.code, data: data };
  }
  if (!res.ok) {
    return { success: false, error: data };
  }
};

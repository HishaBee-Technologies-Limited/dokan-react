'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';
import { QueryParamsDef } from '@/types/product';

type GetShopsProductsDef = {
  params: QueryParamsDef;
};

export const getShopsProducts = async ({ params }: GetShopsProductsDef) => {
  const cookieStore = cookies();
  const shopId = cookieStore.get('shopId');

  try {
    const res = await authApi.get(
      `/product/all/?` +
        new URLSearchParams({
          shop_id: shopId?.value ?? '',
          sorted_by: params.sorted_by ?? '',
          page: params.page?.toString() ?? '',
          per_page: '10',
        })
    );

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

'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';
import { QueryParamsDef } from '@/types/product';
import { SORT_OPTIONS_TYPES } from '@/config/sorting';

type GetShopsProductsDef = {
  params?: QueryParamsDef;
};

export const getShopsProducts = async ({ params }: GetShopsProductsDef) => {
  const cookieStore = cookies();
  const shopId = cookieStore.get('shopId');

  try {
    const res = await authApi.get(
      `/product/all/?` +
        new URLSearchParams({
          shop_id: shopId?.value ?? '',
          order_by:
            params?.sorted_by === SORT_OPTIONS_TYPES.HIGHEST_AMOUNT
              ? 'selling_price'
              : 'id',
          order_type:
            params?.sorted_by === SORT_OPTIONS_TYPES.NEW_TO_OLD
              ? 'asc'
              : 'desc',
          page: params?.page?.toString() ?? '',
          per_page: '10',
          category: 'true',
          s_query: params?.search ?? '',
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

'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';
import { IGetOrderResponse, QueryParamsDef } from '@/types/orders';

export const getOrders = async ({
  tab,
  params,
}: {
  tab: string;
  params: Omit<QueryParamsDef, 'activatedTab'>;
}) => {
  const cookieStore = cookies();
  const shopId = cookieStore.get('shopId');

  try {
    const res = await authApi.get(
      `/online-shop/orders/${tab}/?` +
        new URLSearchParams({
          shop_id: shopId?.value ?? '',
          start_date: params.start_date ?? '',
          end_date: params.end_date ?? '',
          sorted_by: params.sorted_by ?? '',
          page: params.page?.toString() ?? '',
          per_page: '10',
        })
    );
    const data = await res.json();

    if (res?.ok) {
      return { success: true, status: data, data: data as IGetOrderResponse };
    }
    if (!res?.ok) {
      return { success: false, error: data };
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Something went wrong' };
  }
};

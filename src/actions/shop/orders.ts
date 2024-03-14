"use server";

import { authApi } from "@/lib/api";
import { cookies } from "next/headers";

export const getOrders = async ({ activeTab}: { activeTab: string}) => {
  const cookieStore = cookies();
  const shopId = cookieStore.get('shopId')

  try {
    const res = await authApi.get(`/online-shop/orders/${activeTab}/?shop_id=${shopId?.value}`);
    const data = await res.json();

    if (res?.ok) {
      return { success: true, status: data, data: data };
    }
    if (!res?.ok) {
      return { success: false, error: data };
    }
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
};

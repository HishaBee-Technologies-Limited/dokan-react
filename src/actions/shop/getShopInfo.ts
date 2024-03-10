"use server";

import { authApi } from "@/lib/api";

export const getShopInfo = async (shopId: string) => {
  try {
    const res = await authApi.get(`/online-shop?shop_id=${shopId}`);
    const data = await res.json();

    if (res?.ok) {
      return { success: true, status: data.code, data: data };
    }
    if (!res?.ok) {
      return { success: false, error: data };
    }
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
};
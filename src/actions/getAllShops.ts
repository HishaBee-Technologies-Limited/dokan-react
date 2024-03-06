"use server";

import { authApi } from "@/lib/api";

export const getAllShops = async () => {
  try {
    const res = await authApi.get("/shop/all");
    const data = await res.json();
    console.log("shopp-----", data);
  } catch {}
};

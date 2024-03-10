"use server";

import { authApi } from "@/lib/api";

export const getAreas = async () => {
  try {
    const res = await authApi.get("/area/all");
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

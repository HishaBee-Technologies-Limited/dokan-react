"use server";

import { authApi } from "@/lib/api";
import { IUserResponse } from "@/types/contact/partyResponse";

export const getAllEmployee = async (shopId: number) => {
    try {
        const res = await authApi.get(`/employee/all?shop_id=${shopId}`);
        const data = await res.json();

        if (res.ok) {
            return {
                success: true,
                status: data?.code,
                data: data as IUserResponse[],
            };
        }
        if (!res.ok) {
            return { success: false, error: data };
        }
    } catch {
        return { success: false, error: "Something went wrong" };
    }
};

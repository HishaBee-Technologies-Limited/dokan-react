"use server";

import { authApi } from "@/lib/api";
import { IPartyResponse } from "@/types/contact/partyResponse";

export const getAllCustomer = async (shopId: number) => {
    try {
        const res = await authApi.get(`/customer/all?shop_id=${shopId}`);
        const data = await res.json();

        if (res.ok) {
            return {
                success: true,
                status: data?.code,
                data: data as IPartyResponse[],
            };
        }
        if (!res.ok) {
            return { success: false, error: data };
        }
    } catch {
        return { success: false, error: "Something went wrong" };
    }
};

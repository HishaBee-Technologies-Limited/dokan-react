"use server";

import { authApi } from "@/lib/api";
import { IPartyRequest } from "@/types/contact/partyRequest";

export const editCustomer = async (payload: IPartyRequest) => {
    const {
        id,
        name,
        mobile,
        shop_id,
        email,
        address,
        image_src,
    } = payload;
    const params = `id=${id}&name=${name}&shop_id=${shop_id}&address=${address}&email=${email}&mobile=${mobile}&image_src=${image_src}`
    try {
        const res = await authApi.put(`/customer/edit?${params}`, payload);
        const data = await res.json();

        if (res.ok) {
            return {
                success: true,
                status: data?.code,
                data: data as IPartyRequest,
            };
        }
        if (!res.ok) {
            return { success: false, error: data };
        }
    } catch {
        return { success: false, error: "Something went wrong" };
    }
};

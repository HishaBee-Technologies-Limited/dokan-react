"use server";

import { authApi } from "@/lib/api";
import { IUserRequest } from "@/types/contact/partyRequest";

export const addCustomer = async (payload: IUserRequest) => {
    const {
        name,
        mobile,
        shop_id,
        email,
        address,
        image_src,
    } = payload;
    const params = `name=${name}&shop_id=${shop_id}&address=${address}&email=${email}&mobile=${mobile}&image_src=${image_src}`
    try {
        const res = await authApi.get(`/customer/add?${params}`);
        const data = await res.json();

        if (res.ok) {
            return {
                success: true,
                status: data?.code,
                data: data as IUserRequest,
            };
        }
        if (!res.ok) {
            return { success: false, error: data };
        }
    } catch {
        return { success: false, error: "Something went wrong" };
    }
};

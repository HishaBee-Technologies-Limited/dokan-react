"use server";

import { authApi } from "@/lib/api";
import { IUserRequest } from "@/types/contact/partyRequest";

export const editEmployee = async (payload: IUserRequest) => {
    const {
        id,
        name,
        mobile,
        shop_id,
        email,
        address,
        image_src,
        salary
    } = payload;
    const params = `id=${id}&name=${name}&shop_id=${shop_id}&address=${address}&email=${email}&mobile=${mobile}&image_src=${image_src}&salary_amount=${salary}`
    try {
        const res = await authApi.get(`/employee/edit?${params}`);
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

'use server';

import { ContactType } from '@/enum/contact';
import { authApi } from '@/lib/api';
import { IUserResponse } from '@/types/contact/partyResponse';

export const getPurchaseOrTransactionList = async (
  id: string,
  contactType: string
) => {
  try {
    console.log(id);
    const url =
      contactType === ContactType.CUSTOMER
        ? `/customer/getTransaction/${id}`
        : contactType === ContactType.SUPPLIER
          ? `/supplier/getPurchase/${id}`
          : `/employee/getTransaction/${id}`;
    console.log(url);
    const res = await authApi.get(`${url}`);
    const data = await res.json();

    if (res.ok) {
      return {
        success: true,
        message: data.message,
        status: data.status_code,
        data: data,
      };
    }
    if (!res.ok) {
      return { success: false, error: data };
    }
  } catch {
    return { success: false, error: 'Something went wrong' };
  }
};

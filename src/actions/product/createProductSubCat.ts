'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';
import { IProductPayload } from '@/types/product';
import { revalidatePath } from 'next/cache';

export const createProductSubCat = async ({
  name,
  categoryId,
}: {
  name: string;
  categoryId: string;
}) => {
  try {
    const shopId = cookies().get('shopId')?.value;

    const params = new URLSearchParams({
      name,
      category_id: categoryId,
    });
    console.log(params);
    const res = await authApi.post(
      `/product/categories/add?name=${name}&category_id=${categoryId}`
    );
    const data = await res.json();
    revalidatePath('/product');
    if (res.ok) {
      return {
        success: true,
        status: data?.status_code,
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

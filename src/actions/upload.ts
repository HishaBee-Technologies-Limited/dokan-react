'use server';

import { authApi } from '@/lib/api';

export const filesUpload = async (payload: { image: string; type: string }) => {
  try {
    const res = await authApi.post(`/upload`, payload);
    const data = await res.json();

    console.log({ data });
    console.log({ res });

    // if (res.ok) {
    //     return {
    //         success: true,
    //         status: data?.code,
    //         data: data,
    //     };
    // }
    // if (!res.ok) {
    //     return { success: false, error: data };
    // }
  } catch {
    return { success: false, error: 'Something went wrong' };
  }
};

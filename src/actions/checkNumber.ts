'use server';
import { api } from '@/lib/api';
import { cookies } from 'next/headers';

export const checkNumber = async ({
  mobile_number,
}: {
  mobile_number: string;
}) => {
  const cookieStore = cookies();
  const res = await api.post(`/number_check?mobile_number=${mobile_number}`);
  const data = await res.json();
  console.log(data);
  if (res.ok) {
    cookieStore.set('mobile_number', mobile_number);
    return { success: true, status: data.code, data: data };
  }
  if (!res.ok) {
    if (data.code === 403 || data.code === 404) {
      cookieStore.set('mobile_number', mobile_number);
    }
    return { success: false, error: data };
  }
};

'use server';
import { api } from '@/lib/api';
import { cookies } from 'next/headers';

export const checkNumber = async ({
  mobile_number,
}: {
  mobile_number: string;
}) => {
  const res = await api.post(`/number_check?mobile_number=${mobile_number}`);
  cookies().set('mobile_number', mobile_number);
  console.log(res);
  const data = await res.json();
  console.log(data);
  if (res.ok) {
    return { success: true, status: data.code, data: data };
  }
  if (!res.ok) {
    cookies().set('mobile_number', mobile_number);
    return { success: false, error: data };
  }
};

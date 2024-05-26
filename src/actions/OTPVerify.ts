'use server';
import { api } from '@/lib/api';
import { cookies } from 'next/headers';

export const verifyOTP = async ({
  mobile_number,
  otp,
}: {
  mobile_number: string;
  otp: string;
}) => {
  const cookieStore = cookies();
  const res = await api.post(
    `/otp/verify?mobile_number=${mobile_number}&code=${otp}&type=MANUAL`
  );
  const data = await res.json();
  console.log(data);
  if (res.ok) {
    cookieStore.set('otp', otp);
    return { success: true, status: data.code, data: data };
  }
  if (!res.ok) {
    return { success: false, error: data };
  }
};

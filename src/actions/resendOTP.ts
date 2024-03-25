'use server';
import { api } from '@/lib/api';

export const resendOTP = async ({
  mobile_number,
}: {
  mobile_number: string;
}) => {
  const res = await api.post(`/otp/send?mobile_number=${mobile_number}`);
  const data = await res.json();
  console.log(data);
  if (res.ok) {
    return { success: true, status: data.code, data: data };
  }
  if (!res.ok) {
    return { success: false, error: data };
  }
};

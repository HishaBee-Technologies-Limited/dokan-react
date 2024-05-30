'use server';

import { signOut } from '@/auth';
import { cookies } from 'next/headers';

export const logout = async () => {
  cookies().getAll();
  cookies().delete('shopId');
  cookies().delete('mobile_number');
  await signOut();
};

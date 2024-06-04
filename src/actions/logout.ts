'use server';

import { signOut } from '@/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const logout = async () => {
  cookies().getAll();
  cookies().delete('shopId');
  cookies().delete('mobile_number');
  await signOut({ redirectTo: '/auth' });
  redirect('/auth');
};

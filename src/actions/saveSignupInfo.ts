'use server';

import { cookies } from 'next/headers';
import { SignupCookieStringDef } from '@/schemas/auth';

export const saveSignupInfo = async (signupInfo: SignupCookieStringDef) => {
  const cookie = cookies();
  cookie.set('signup', JSON.stringify(signupInfo), { maxAge: 60 * 1000 });
};

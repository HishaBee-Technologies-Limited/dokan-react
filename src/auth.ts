import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { login, signup } from '@/actions/auth';
import { RegisterSchema } from './schemas/auth';

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        mobile_number: {
          label: 'Mobile Number',
          type: 'text',
          placeholder: 'Mobile',
        },
        pin: {
          label: 'Pin',
          type: 'password',
        },
        address: {
          label: 'Address',
          type: 'text',
        },
        user_intent: {
          label: 'Intent',
          type: 'text',
        },
        brand_name: {
          label: 'Brand',
          type: 'text',
        },
        confirm_pin: {
          label: 'Confirm Pin',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const response = await login({
          mobile_number: credentials?.mobile_number,
          pin: credentials?.pin,
        });

        const user = await response?.data;
        if (response?.status === 200 && user.user.id) return user.user;
        else return { errorMessage: user.message };
      },
    }),
    Credentials({
      id: 'signup',
      name: 'signup',

      async authorize(credentials) {
        const validatedFields = RegisterSchema.safeParse(credentials);
        console.log(validatedFields);
        if (!validatedFields.success) return null;

        const {
          mobile_number,
          pin,
          pin_confirmation,
          brand_name,
          address,
          user_intent,
        } = validatedFields.data;
        const response = await signup({
          mobile_number,
          pin,
          pin_confirmation,
          brand_name,
          address,
          user_intent,
        });

        const user = await response?.data;
        if (response?.status === 200 && user.user.id) return user;
        else return { errorMessage: user.message };
      },
    }),
  ],
});

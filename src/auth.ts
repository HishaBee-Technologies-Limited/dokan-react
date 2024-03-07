import { IRegisterPayload } from "./types/auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { authConfig } from "./auth.config";
// import { cookies } from 'next/headers';
import { api } from "@/lib/api";
import { login, signup } from "@/actions/auth";
import { RegisterSchema } from "./schemas/auth";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      id: "credentials",
      name: "credentials",
      credentials: {
        mobile_number: {
          label: "Mobile Number",
          type: "text",
          placeholder: "Mobile",
        },
        pin: {
          label: "Pin",
          type: "password",
        },
        address: {
          label: "Address",
          type: "text",
        },
        user_intent: {
          label: "Intent",
          type: "text",
        },
        brand_name: {
          label: "Brand",
          type: "text",
        },
        confirm_pin: {
          label: "Confirm Pin",
          type: "password",
        },
      },
      async authorize(credentials) {
        console.log("credentials------------", credentials);
        // const cookieStore = cookies();
        const response = await login({
          mobile_number: credentials?.mobile_number,
          pin: credentials?.pin,
        });
        const user = await response?.data;
        console.log("user-signin------------", response);
        if (response?.status === 200 && user.user.id) {
          //   cookieStore.set('access_token', user.access_token);
          //   cookieStore.set('auth-error-message', '');
          return user.user;
        } else {
          return { errorMessage: user.message };
        }
      },
    }),
    Credentials({
      id: "signup",
      name: "signup",

      async authorize(credentials) {
        console.log("credentials------------Signup", credentials);
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
        console.log("user-signup------------", response);
        if (response?.status === 200 && user.user.id) {
          return user;
        } else {
          return { errorMessage: user.message };
        }
      },
    }),
  ],
});

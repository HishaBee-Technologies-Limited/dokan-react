"use server";
import { AuthError } from "next-auth";
import { signIn } from "../auth";
import { api } from "@/lib/api";
import { IRegisterPayload } from "@/types/auth";
import { z } from "zod";
import { RegisterSchema } from "@/schemas/auth";

export async function authenticate(
  prevState: string | undefined,
  formData: { mobile_number: string; pin: string }
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function authenticateSignUp(
  prevState: string | undefined,
  formData: z.infer<typeof RegisterSchema>
) {
  try {
    await signIn("signup", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export const login = async (payload: any) => {
  const res = await api.post(
    `/login?mobile_number=${payload?.mobile_number}&pin=${payload?.pin}`,
    payload
  );
  const data = await res.json();
  console.log(data);
  if (res.ok) {
    return { success: true, status: data.code, data: data };
  }
  if (!res.ok) {
    return { success: false, error: data };
  }
};

export const signup = async (payload: z.infer<typeof RegisterSchema>) => {
  const res = await api.post(
    `/register?brand_name=${payload?.brand_name}&address=${payload?.address}&pin=${payload?.pin}&pin_confirmation=${payload?.pin_confirmation}&mobile_number=${payload?.mobile_number}&use_intent=${payload?.use_intent}`
  );

  const data = await res.json();
  console.log(data);
  if (res.ok) {
    return { success: true, status: data.code, data: data };
  }
  if (!res.ok) {
    return { success: false, error: data };
  }
};

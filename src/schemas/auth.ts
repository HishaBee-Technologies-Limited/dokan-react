import { z } from 'zod';

export const RegisterSchema = z.object({
  mobile_number: z.string(),
  pin: z.string().min(5, {
    message: 'Minimum 5 characters required',
  }),
  pin_confirmation: z.string().min(5, {
    message: 'Minimum 5 characters required',
  }),
  brand_name: z.string(),
  address: z.string(),
  user_intent: z.string(),
});

export type RegisterSchemaDef = z.infer<typeof RegisterSchema>;
export type SignupCookieStringDef = Omit<
  RegisterSchemaDef,
  'pin' | 'pin_confirmation' | 'mobile_number'
>;

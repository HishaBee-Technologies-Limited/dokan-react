import { z } from "zod";

export const RegisterSchema = z.object({
  mobile_number: z.string(),
  pin: z.string().min(5, {
    message: "Minimum 5 characters required",
  }),
  pin_confirmation: z.string().min(5, {
    message: "Minimum 5 characters required",
  }),
  brand_name: z.string(),
  address: z.string(),
  use_intent: z.string(),
});

import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  number: z.string().max(11).min(11, {
    message: 'Number must be 11 characters.',
  }),
  address: z.string().optional(),
  email: z.string().optional(),
  salary: z.string().optional(),
});

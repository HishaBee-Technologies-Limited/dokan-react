import { z } from 'zod';

export const ShopSchema = z.object({
  name: z.string().min(2, {
    message: 'this field is required.',
  }),
  shop_type: z.number().min(1, {
    message: 'this field is required.',
  }),
  area: z.number(),
  address: z.string(),
  sell_type: z.string().optional(),
  number: z.string().optional(),
});

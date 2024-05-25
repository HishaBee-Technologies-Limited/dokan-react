import { z } from 'zod';

const WarrantyTypeSchema = z
  .union([
    z.literal('DAY'),
    z.literal('WEEK'),
    z.literal('MONTH'),
    z.literal('YEAR'),
  ])
  .optional();
export type WarrantyType = z.infer<typeof WarrantyTypeSchema>;

const DiscountTypeSchema = z
  .union([z.literal('PERCENT'), z.literal('AMOUNT')])
  .optional();

export type DiscountType = z.infer<typeof DiscountTypeSchema>;

export const ProductSchema = z.object({
  files: z.array(z.string()).optional(),
  product_name: z.string().min(2, {
    message: 'this field is required.',
  }),
  stock: z.string().optional(),
  purchase_price: z.string(),
  sell_price: z.string(),
  unit: z.string().optional(),
  category: z.string().optional(),
  sub_category: z.string().optional(),
  // others------------
  bulk_price: z.string().optional(),
  bulk_quantity: z.string().optional(),
  low_stock: z.string().optional(),
  vat_percentage: z.string().optional(),
  warranty_duration: z.string().optional(),
  warranty_type: WarrantyTypeSchema.optional(),
  discount: z.string().optional(),
  discount_type: z.string().optional(),
  // boolean
  online_sell: z.boolean().optional(),
  low_stock_check: z.boolean().optional(),
  vat_check: z.boolean(),
  warranty_check: z.boolean().optional(),
  discount_check: z.boolean().optional(),
  bulk_sell_check: z.boolean().optional(),
  image_url: z.string().optional(),
});

export type ProductFormDef = z.infer<typeof ProductSchema>;

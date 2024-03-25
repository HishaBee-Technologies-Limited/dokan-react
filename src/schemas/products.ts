import { z } from 'zod';

const WarrantyTypeSchema = z.union([
  z.literal('DAY'),
  z.literal('WEEK'),
  z.literal('MONTH'),
  z.literal('YEAR'),
]);
export type WarrantyType = z.infer<typeof WarrantyTypeSchema>;

const DiscountTypeSchema = z.union([z.literal('PERCENT'), z.literal('AMOUNT')]);

export type DiscountType = z.infer<typeof DiscountTypeSchema>;

export const ProductSchema = z.object({
  files: z.array(z.string()),
  product_name: z.string().min(2, {
    message: 'this field is required.',
  }),
  stock: z.string(),
  purchase_price: z.string(),
  sell_price: z.string(),
  unit: z.string(),
  category: z.string(),
  sub_category: z.string(),
  // others------------
  bulk_price: z.string(),
  bulk_quantity: z.string(),
  low_stock: z.string(),
  vat_percentage: z.string(),
  warranty_duration: z.string(),
  warranty_type: WarrantyTypeSchema,
  discount: z.string(),
  discount_type: DiscountTypeSchema,
  // boolean
  online_sell: z.boolean(),
  low_stock_check: z.boolean(),
  vat_check: z.boolean(),
  warranty_check: z.boolean(),
  discount_check: z.boolean(),
  bulk_sell_check: z.boolean(),
});

export type ProductFormDef = z.infer<typeof ProductSchema>;

import { DiscountType, WarrantyType } from '@/schemas/products';
export interface IProduct {
  id: number;
  name: string;
  stock: number;
  cost_price: number;
  stock_alert: number;
  image_url: string;
  selling_price: number;
  discount: number;
  warranty: number;
  vat_percent: number;
  sub_category: { name: string; id: number; category_id: number };
  description: string;
  unique_id: string;
  version?: number;
  created_at?: string; // Date and time in ISO format
  updated_at?: string; // Date and time in ISO format
  wholesale_price?: number;
  wholesale_amount?: number;
  discount_type?: DiscountType;
  warranty_type?: WarrantyType;
  sell_online?: boolean;
  vat_applicable?: boolean;
  unit?: number;
}

export interface IProductPayload {
  shop_id?: string;
  id?: number;
  sub_category?: number | { name: string; id: number; category_id: number };
  name?: string;
  selling_price?: number;
  cost_price?: string;
  stock?: number;
  description?: string;
  vat_applicable?: boolean;
  vat_percent?: number;
  gallery?: string[]; // An array of strings (empty in this case)
  product_type?: 'SIMPLE';
  barcode?: null | string; // Can be null or a string
  sell_online?: boolean;
  shipping_cost?: number;
  wholesale_price?: number;
  wholesale_amount?: number;
  stock_alert?: number;
  warranty?: number;
  warranty_type?: WarrantyType;
  discount?: string;
  discount_type?: DiscountType;
  created_at?: string; // Date and time in ISO format
  updated_at?: string; // Date and time in ISO format
  version?: number;
  unique_id?: string;
  prevent_stock_item?: boolean;
  delivery_charge_id?: string[]; // An array of strings (empty in this case)
  weight?: string; // Represented as a string (e.g., "0.0")
  image_url?: string;
  unit?: number;
}

export interface IUnits {
  id: number;
  name: string;
  bn_name: string;
  type: string;
}

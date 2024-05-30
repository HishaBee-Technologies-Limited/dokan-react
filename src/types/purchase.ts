import { DiscountType } from '@/schemas/products';
import { IProductPayload } from './product';

export interface IProductPurchasePayload {
  batch?: string;
  created_at: string;
  date: string;
  discount: number;
  employee_mobile?: string;
  employee_name?: string;
  extra_charge: number;
  note?: string;
  payment_method: number;
  payment_status: 'PAID' | 'UNPAID';
  purchase_barcode?: string;
  received_amount: number;
  shop_id?: number;
  supplier_mobile?: string;
  supplier_name?: string;
  total_item: number;
  total_price: number;
  unique_id: string;
  updated_at: string;
  user_id?: number;
  version: number;
  discount_type: string;
  sms: string | null;
}

export type PaymentStatusDef = 'PAID' | 'UNPAID';

export interface IProductItemPurchasePayload {
  created_at: string;
  name?: string;
  quantity?: number;
  unit_price: number;
  unit_cost: number;
  purchase_unique_id: string;
  shop_product_id: number;
  shop_product_variance_id: number;
  shop_id?: number;
  purchase_id?: number;
  price?: number;
  unique_id: string;
  updated_at: string;
  version: number;
}

export interface IPurchaseHistoryResponse {
  batch: string | null;
  created_at: string;
  discount: number | null;
  discount_type: DiscountType;
  employee_mobile: string;
  employee_name: string;
  extra_charge: number | null;
  id: number;
  image: string | null;
  note: string | null;
  payment_method: number;
  payment_status: string;
  purchase_barcode: null | string;
  received_amount: number;
  shop_id: number;
  supplier_address: null | string;
  supplier_mobile: string;
  supplier_name: string;
  total_item: number;
  total_price: number;
  unique_id: string;
  updated_at: string;
  user_id: number;
  version: number;
  transaction_type?: string;
  customer_name?: string;
  customer_mobile?: string;
}

export interface IProducts extends IProductItemPurchasePayload {
  product: IProductPayload;
  shop_product_by_uniqueid?: IProductPayload;
}
export interface IPurchaseProducts extends IPurchaseHistoryResponse {
  items?: IProducts[];
  transaction_items?: IProducts[];
}

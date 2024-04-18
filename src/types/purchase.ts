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

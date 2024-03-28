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
  purchase_barcode: string;
  received_amount: number;
  shop_id: number;
  supplier_mobile?: string;
  supplier_name?: string;
  total_item: number;
  total_price: number;
  unique_id: string;
  updated_at: string;
  user_id: number;
  version: number;
}

export type PaymentStatusDef = 'PAID' | 'UNPAID';

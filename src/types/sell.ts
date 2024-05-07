export interface IProductSellPayload {
  created_at: string;
  discount: number;
  employee_mobile?: string;
  employee_name?: string;
  note?: string;
  payment_method: number;
  payment_status: 'PAID' | 'UNPAID';
  purchase_barcode?: string;
  received_amount: number;
  shop_id?: number;
  customer_mobile?: string;
  customer_name?: string;
  total_item: number;
  total_price: number;
  unique_id: string;
  updated_at: string;
  user_id?: number;
  version: number;
  discount_type?: string;
  total_discount: number;
  change_amount?: number;
  customer_address?: string;
  total_profit?: number;
  transaction_type?: 'PRODUCT_SELL' | 'QUICK_SELL'; //PRODUCT_SELL
}

export interface IProductItemSellPayload {
  created_at: string;
  name?: string;
  quantity?: number;
  unit_price: number;
  unit_cost: number;
  transaction_unique_id: string;
  shop_product_id: number;
  shop_product_variance_id: number;
  shop_id?: number;
  purchase_id?: number;
  price?: number;
  unique_id: string;
  updated_at: string;
  version: number;
  profit: number;
  status: string;
}

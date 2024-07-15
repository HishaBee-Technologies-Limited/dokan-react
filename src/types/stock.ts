import { IProduct } from './product';

export interface IStockResponse {
  id: number;
  shop_id: number;
  shop_product_id: number;
  shop_product_variance_id: string | null;
  quantity: string;
  message: string | null;
  created_at: string;
  updated_at: string;
  increase: number;
  bn_message: string | null;
  version: number;
  unique_id: string;
  after_stock: number;
  before_stock: number;
  stock_value: number;
  shop_product_unique_id: string;
  purchase_item_unique_id: string;
  transaction_item_unique_id: string | null;
  change: string | null;
  delete_record_for: string | null;
  neg_balance: number;
  pos_balance: number;
  name: string;
  category: number;
  image: string | null;
  shop_product: IProduct;
}

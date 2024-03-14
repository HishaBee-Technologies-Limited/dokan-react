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
  sub_category: { name: string };
  description: string;
  unique_id: string;
}

export interface IDueListResponse {
  id: number;
  user_id: number;
  shop_id: number;
  due_amount: number;
  created_at: string;
  updated_at: string;
  due_alert: string;
  contact_mobile: string;
  contact_name: string;
  contact_type: 'CUSTOMER' | 'SUPPLIER';
  version: number;
  unique_id: string;
  alert_shop_sms: boolean;
  alert_customer_sms: boolean;
  alert_notification: boolean;
}

export interface IDueItemsResponse {
  id: number;
  image: string | null;
  transaction_type: string | null;
  note: string | null;
  due_left: number; //------------------->> due_left
  amount: number; //------------------->> amount
  created_at: string;
  updated_at: string;
  shop_id: number;
  version: number;
  transaction_unique_id: string | null;
  due_unique_id: string;
  type: string | null;
  payment_status: string;
  unique_id: string;
  purchase_unique_id: string | null;
  contact_id: string | null;
  contact_type: 'CUSTOMER' | 'SUPPLIER';
  contact_unique_id: string | null;
  pos_balance: number; //------------------->> pos_balance
  neg_balance: number; //------------------->> neg_balance
  signed_balance: string | null; //------------------->> signed_balance
  platform: string;
  archived: string | null;
  contact_name: string;
  contact_mobile: string;
  due: IDueListResponse;
}

import { ContactType } from '@/enum/contact';

export interface IExpense {
  id?: number;
  user_id?: number;
  shop_id?: number;
  type: string;
  purpose: string;
  details: null | string;
  amount: number;
  created_at: string;
  updated_at: string;
  image?: null | string;
  contact_mobile?: null | string;
  contact_name?: null | string;
  contact_type?: ContactType;
  version: number;
  unique_id: string;
  image_changed?: boolean;
}

export interface ICategory {
  id: number;
  shop_id: number;
  name: string;
  created_at: string;
  updated_at: string;
  unique_id: null | string;
}

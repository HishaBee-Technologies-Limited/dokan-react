export interface IUserResponse {
  id: number;
  user_id: number;
  shop_id: number;
  name: string;
  mobile: string;
  email: string | null;
  address: string | null;
  image_src: string | null;
  created_at: string;
  updated_at: string;
  unique_id: string;
  other_info?: null | string;
  salary?: string | undefined;
  // version: number;
  // supplied_items?: string | null,
}

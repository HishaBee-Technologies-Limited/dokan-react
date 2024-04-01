export type IUserRequest = {
  id?: string | null;
  shop_id?: number | null;
  user_id?: number;
  name: string;
  mobile: string;
  email: string | null;
  address: string | null;
  image_src?: string | null;
  salary?: string | null;
};

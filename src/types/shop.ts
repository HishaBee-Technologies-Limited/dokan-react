export interface IShopResponse {
  id: number;
  name: string;
  address: string;
  active: number;
}

export interface IArea {
  id: number;
  name: string;
  bn_name: string;
  district_id: number;
}

export interface IDistrcits {
  name: string;
  id: number;
  division_id: number;
  areas: IArea[];
}

export interface IAllArea {
  name: string;
  id: number;
  districts: IDistrcits[];
}

export interface IShopTypes {
  id: number;
  name: string;
  bn_name: string;
}

export interface shopPayload {
  name: string;
  type: number;
  address: string;
  area: number;
  publicData?: number;
  shopId?: number;
  number?: string;
}

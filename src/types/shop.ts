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

export type OverviewDef = {
  name: string;
  slug: string;
  address: string;
  active_orders: number;
  online_products: number;
  total_earning: number;
  processing_orders: number;
  delivered_orders: number;
};

export type ShopDef = OverviewDef & {
  public_number: string;
  type: number;
  area: number;
};

export type GetShopInfoDataDef = {
  overview: OverviewDef; //@TODO: collaborate with ziku bhai
  shop: ShopDef;
};

export interface IGetShopInfoResponse {
  data: GetShopInfoDataDef;
}

export type IOverviewOtherDef = {
  id: number;
  img: string;
  title: string;
  url: string;
};

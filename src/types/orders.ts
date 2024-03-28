import {
  DELIVERY_STATUS,
  ORDER_STATUS,
  ORDER_TYPE,
  PAYMENT_STATUS,
} from '@/config/orders';
import { ISortOptions } from '@/types/Sorting';
export type OrdersTableHeaderDef = { id: number; label: string };
export type OrderTypeDef = (typeof ORDER_TYPE)[keyof typeof ORDER_TYPE];
export type PaymentStatusDef =
  (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];
export type DeliveryStatusDef =
  (typeof DELIVERY_STATUS)[keyof typeof DELIVERY_STATUS];
export type FilteringOptionDef = { label: string; value: DeliveryStatusDef };
export type OrderStatusDef = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export type OrderDetailsDef = {
  id: number;
  delivery_status: DeliveryStatusDef;
};

export type OrdersDef = {
  id: number;
  code: string;
  created_at: string;
  shipping_address: string;
  grand_total: number;
  order_details: OrderDetailsDef[];
  payment_type: OrderTypeDef;
  payment_status: PaymentStatusDef;
};

export type LinksDef = {
  url: string | null;
  label: string;
  active: boolean;
};

export interface IGetOrderResponse {
  data: {
    data: OrdersDef[];
    to: number;
    total: number;
    current_page: number;
    last_page: number;
    per_page: number;
  };
}

export type QueryParamsDef = {
  start_date: string | undefined;
  end_date: string | undefined;
  sorted_by: ISortOptions['value'];
  page: number;
  activatedTab: DeliveryStatusDef;
};

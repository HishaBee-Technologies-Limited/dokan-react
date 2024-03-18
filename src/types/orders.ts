import { DELIVERY_STATUS, ORDER_TYPE, PAYMENT_STATUS } from "@/config/orders";
export type IOrdersTableHeaderType = {id: number, label: string}
export type IOrderTypeType = (typeof ORDER_TYPE)[keyof typeof ORDER_TYPE]
export type IPaymentStatusType = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS]
export type IDeliveryStatusType = (typeof DELIVERY_STATUS)[keyof typeof DELIVERY_STATUS]
export type IFilteringOptionType = { label: string, value: IDeliveryStatusType }

export type IOrderDetails = {
  id: number,
  delivery_status: IDeliveryStatusType
}

export type IOrderItemType = {
  id: number,
  code: string,
  created_at: string,
  shipping_address: string,
  grand_total: number,
  order_details: IOrderDetails[],
  payment_type: IOrderTypeType,
  payment_status: IPaymentStatusType,
}
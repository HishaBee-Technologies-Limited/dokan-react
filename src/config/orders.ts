import { IFilteringOptionType, IOrdersTableHeaderType } from "@/types/orders";

export const OrdersTableHeader:IOrdersTableHeaderType [] = [
  { id: 1, label: 'Order Id'},
  { id: 2, label: 'Date'},
  { id: 3, label: 'Contact'},
  { id: 4, label: 'Amount'},
  { id: 5, label: 'Items'},
  { id: 6, label: 'type'},
]

export const ORDER_TYPE = {
  CASH_ON_DELIVERY: 'CASH_ON_DELIVERY'
} as const;

export const PAYMENT_STATUS = {
  UNPAID: 'unpaid'
} as const;

export const DELIVERY_STATUS = {
  NEW: 'new',
  ACTIVE: 'active',
  COMPLETE: 'complete',
} as const;

export const filteringOptions:IFilteringOptionType[] = [
  {
    label: 'New orders',
    value: DELIVERY_STATUS.NEW
  },
  {
    label: 'Active orders',
    value: DELIVERY_STATUS.ACTIVE
  },
  {
    label: 'Complete',
    value: DELIVERY_STATUS.COMPLETE
  },
]
import {
  FilteringOptionDef,
  OrdersTableHeaderDef,
  QueryParamsDef,
} from '@/types/orders';
import { getFormattedStartOfMonth, getFormattedToday } from '@/lib/date';

export const OrdersTableHeader: OrdersTableHeaderDef[] = [
  { id: 1, label: 'Order Id' },
  { id: 2, label: 'Date' },
  { id: 3, label: 'Contact' },
  { id: 4, label: 'Amount' },
  { id: 5, label: 'Items' },
  { id: 6, label: 'type' },
];

export const ORDER_TYPE = {
  CASH_ON_DELIVERY: 'CASH_ON_DELIVERY',
} as const;

export const PAYMENT_STATUS = {
  UNPAID: 'unpaid',
} as const;

export const DELIVERY_STATUS = {
  NEW: 'new',
  ACTIVE: 'active',
  COMPLETE: 'complete',
} as const;

export const ORDER_STATUS = {
  ACCEPTED: 'accepted',
  PENDING: 'pending',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export const filteringOptions: FilteringOptionDef[] = [
  {
    label: 'New orders',
    value: DELIVERY_STATUS.NEW,
  },
  {
    label: 'Active orders',
    value: DELIVERY_STATUS.ACTIVE,
  },
  {
    label: 'Complete',
    value: DELIVERY_STATUS.COMPLETE,
  },
];

export const ORDER_SORT_OPTIONS = [
  {
    id: 1,
    name: 'New to Old',
    bn_name: 'নতুন থেকে পুরাতন',
    value: 'new_to_old',
  },
  {
    id: 2,
    name: 'Old  to New',
    bn_name: 'পুরাতন থেকে নতুন',
    value: 'old_to_new',
  },
  {
    id: 3,
    name: '৳ - Less to More',
    bn_name: '৳ - কম থেকে বেশি',
    value: 'lowest_amount',
  },
  {
    id: 4,
    name: '৳ - More to Less',
    bn_name: '৳ - বেশি থেকে কম',
    value: 'highest_amount',
  },
];

export const INITIAL_QUERY_PARAMS: QueryParamsDef = {
  start_date: getFormattedStartOfMonth(),
  end_date: getFormattedToday(),
  sorted_by: ORDER_SORT_OPTIONS[0].value,
  page: 1,
  activatedTab: DELIVERY_STATUS.NEW,
};

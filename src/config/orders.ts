import {
  FilteringOptionDef,
  OrdersTableHeaderDef,
  QueryParamsDef,
} from '@/types/orders';
import { getFormattedStartOfMonth, getFormattedToday } from '@/lib/date';
import { SORT_OPTIONS_TYPES } from '@/config/sorting';

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

export const INITIAL_QUERY_PARAMS: QueryParamsDef = {
  start_date: getFormattedStartOfMonth(),
  end_date: getFormattedToday(),
  sorted_by: SORT_OPTIONS_TYPES.NEW_TO_OLD,
  page: 1,
  activatedTab: DELIVERY_STATUS.NEW,
};

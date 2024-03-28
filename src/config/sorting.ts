import { ISortOptions } from '@/types/Sorting';

export const SORT_OPTIONS_TYPES = {
  NEW_TO_OLD: 'new_to_old',
  OLD_TO_NEW: 'old_to_new',
  LOWEST_AMOUNT: 'lowest_amount',
  HIGHEST_AMOUNT: 'highest_amount',
} as const;

export const SORT_OPTIONS: ISortOptions[] = [
  {
    id: 1,
    name: 'New to Old',
    bn_name: 'নতুন থেকে পুরাতন',
    value: SORT_OPTIONS_TYPES.NEW_TO_OLD,
  },
  {
    id: 2,
    name: 'Old  to New',
    bn_name: 'পুরাতন থেকে নতুন',
    value: SORT_OPTIONS_TYPES.OLD_TO_NEW,
  },
  {
    id: 3,
    name: '৳ - Less to More',
    bn_name: '৳ - কম থেকে বেশি',
    value: SORT_OPTIONS_TYPES.LOWEST_AMOUNT,
  },
  {
    id: 4,
    name: '৳ - More to Less',
    bn_name: '৳ - বেশি থেকে কম',
    value: SORT_OPTIONS_TYPES.HIGHEST_AMOUNT,
  },
];

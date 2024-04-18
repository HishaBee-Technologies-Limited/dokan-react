import { SORT_OPTIONS_TYPES } from '@/config/sorting';

export type SortOptionsTypesDef =
  (typeof SORT_OPTIONS_TYPES)[keyof typeof SORT_OPTIONS_TYPES];

export interface ISortOptions {
  id: number;
  name: string;
  value: SortOptionsTypesDef;
  bn_name: string;
}

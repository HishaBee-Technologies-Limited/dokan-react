import { SORT_OPTIONS_TYPES } from '@/config/sorting';
import { QueryParamsDef } from '@/types/product';

export const INITIAL_QUERY_PARAMS: QueryParamsDef = {
  search: '',
  sorted_by: SORT_OPTIONS_TYPES.NEW_TO_OLD,
  page: 1,
};

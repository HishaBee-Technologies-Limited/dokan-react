import { isEqual } from 'lodash';
import { usePathname, useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { INITIAL_QUERY_PARAMS } from '@/config/orders';
import { useOrdersStore } from '@/stores/useOrdersStore';
import { DeliveryStatusDef, QueryParamsDef } from '@/types/orders';
import { generateQueryString } from '@/lib/queryString';
import { SortOptionsTypesDef } from '@/types/Sorting';

export const useOrdersTable = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const { setQueryParams, queryParams } = useOrdersStore();

  const updateQueryParams = useCallback(
    (params: QueryParamsDef) => {
      setQueryParams(params);
      router.push(pathname + '?' + generateQueryString(params));
    },
    [pathname, router]
  );

  useEffect(() => {
    const params = {
      start_date:
        searchParams.get('start_date') || INITIAL_QUERY_PARAMS.start_date,
      end_date: searchParams.get('end_date') || INITIAL_QUERY_PARAMS.end_date,
      sorted_by:
        (searchParams.get('sorted_by') as SortOptionsTypesDef) ||
        INITIAL_QUERY_PARAMS.sorted_by,
      page: Number(searchParams.get('page')) || INITIAL_QUERY_PARAMS.page,
      activatedTab:
        (searchParams.get('activatedTab') as DeliveryStatusDef) ||
        INITIAL_QUERY_PARAMS.activatedTab,
    };

    setQueryParams(params);
    router.push(pathname + '?' + generateQueryString(params));
  }, [searchParams]);

  return { updateQueryParams };
};

import { usePathname, useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { INITIAL_QUERY_PARAMS } from '@/config/orders';
import { DeliveryStatusDef, QueryParamsDef } from '@/types/orders';
import { generateQueryString } from '@/lib/queryString';

export const useOrdersTable = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const [queryParams, setQueryParams] =
    useState<QueryParamsDef>(INITIAL_QUERY_PARAMS);

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
        searchParams.get('sorted_by') || INITIAL_QUERY_PARAMS.sorted_by,
      page: Number(searchParams.get('page')) || INITIAL_QUERY_PARAMS.page,
      activatedTab:
        (searchParams.get('activatedTab') as DeliveryStatusDef) ||
        INITIAL_QUERY_PARAMS.activatedTab,
    };

    setQueryParams(params);
    router.push(pathname + '?' + generateQueryString(params));
  }, [searchParams]);

  return { updateQueryParams, queryParams };
};

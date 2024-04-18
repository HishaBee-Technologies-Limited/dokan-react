import { usePathname, useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { INITIAL_QUERY_PARAMS } from '@/config/product';
import { QueryParamsDef } from '@/types/product';
import { generateQueryString } from '@/lib/queryString';
import { SortOptionsTypesDef } from '@/types/Sorting';

export const useProductTable = () => {
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
      sorted_by:
        (searchParams.get('sorted_by') as SortOptionsTypesDef) ||
        INITIAL_QUERY_PARAMS.sorted_by,
      page: Number(searchParams.get('page')) || INITIAL_QUERY_PARAMS.page,
      search: searchParams.get('search') || INITIAL_QUERY_PARAMS.search,
    };

    setQueryParams(params);
    router.push(pathname + '?' + generateQueryString(params));
    console.count();
  }, []);

  return { updateQueryParams, queryParams };
};

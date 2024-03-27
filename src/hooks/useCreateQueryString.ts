import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useCreateQueryString = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const setQueryString = useCallback(
    (name: string, value: string | number | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value ? value.toString() : '');

      return params.toString();
    },
    [searchParams]
  );

  const getQueryString = (name: string) => {
    const params = new URLSearchParams(searchParams.toString());
    return params.get(name);
  };

  const removeQueryParam = (param: string) => {
    // const { pathname, query } = router;
    const params = new URLSearchParams(searchParams.toString());
    params.delete(param);
    console.log('params=============', `${pathname}?${params.toString()}`);
    router.replace(`${pathname}?${params.toString()}`, undefined);
    // { shallow: true }
  };

  return { setQueryString, getQueryString, removeQueryParam };
};

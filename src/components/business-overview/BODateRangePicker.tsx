'use client';

import { DatePickerWithRange } from '@/components/common/DatePickerWithRange';
import React, { useEffect, useState } from 'react';
import { getFormattedStartOfMonth, getFormattedToday } from '@/lib/date';
import { generateQueryString } from '@/lib/queryString';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type IniQueryParamsDef = {
  start_date: string | undefined;
  end_date: string | undefined;
};

export const INITIAL_QUERY_PARAMS: IniQueryParamsDef = {
  start_date: getFormattedStartOfMonth(),
  end_date: getFormattedToday(),
};

export default function BODateRangePicker() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [queryParams, setQueryParams] =
    useState<IniQueryParamsDef>(INITIAL_QUERY_PARAMS);

  const selectedDateRange = {
    from: queryParams.start_date,
    to: queryParams.end_date,
  };

  useEffect(() => {
    const params = {
      start_date:
        searchParams.get('start_date') || INITIAL_QUERY_PARAMS.start_date,
      end_date: searchParams.get('end_date') || INITIAL_QUERY_PARAMS.end_date,
    };

    setQueryParams(params);
    router.push(pathname + '?' + generateQueryString(params));
  }, [searchParams]);

  return (
    <DatePickerWithRange
      dateRange={selectedDateRange}
      onChange={(range) => {
        setQueryParams({
          start_date: range?.from
            ? range.from.toISOString().split('T')[0]
            : undefined,
          end_date: range?.to
            ? range.to.toISOString().split('T')[0]
            : undefined,
        });
      }}
    />
  );
}

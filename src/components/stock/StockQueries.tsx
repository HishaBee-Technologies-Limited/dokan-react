'use client';
import React from 'react';
import { Text } from '@/components/common/text';
import Search from '@/components/common/forms/Search';
import { FilterIcon } from '@/components/common/icons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const StockQueries = () => {
  return (
    <div className="flex flex-wrap justify-between items-center gap-space16">
      <div className="flex gap-space12 order-2 lg:order-1 grow">
        <Search
          onChange={() => {}}
          placeholder="Search by product name"
          wrapperClasses={`max-w-[36rem] lg:w-[37rem]`}
        />

        <Select onValueChange={() => {}} defaultValue={''}>
          <SelectTrigger className="max-w-max gap-space8 border-color">
            <FilterIcon />
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <div className="max-h-[24rem] overflow-y-scroll">
              <SelectItem value="m@example.com">m@example.com</SelectItem>
              <SelectItem value="m@google.com">m@google.com</SelectItem>
              <SelectItem value="m@support.com">m@support.com</SelectItem>
            </div>
          </SelectContent>
        </Select>
      </div>

      <article className="xl:max-w-[46rem] min-w-[32rem] flex gap-space12 order-1 lg:order-2 grow">
        <article className="bg-primary-10 rounded-md w-full py-space8 px-space12 space-y-space4">
          <Text
            title="buying price"
            variant="secondary"
            className="uppercase text-xs text-semibold"
          />
          <Text title="৳ 1200" className="text-semibold" />
        </article>
        <article className="bg-primary-10 rounded-md w-full py-space8 px-space12 space-y-space4">
          <Text
            title="Stock quantity"
            variant="secondary"
            className="uppercase text-xs text-semibold"
          />
          <Text title="111" className="text-semibold" />
        </article>
      </article>
    </div>
  );
};

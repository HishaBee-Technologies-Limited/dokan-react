'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SortIcon } from '@/components/common/icons';
import React from 'react';
import { ORDER_SORT_OPTIONS } from '@/config/orders';
import { useOrdersTable } from '@/hooks/useOrdersTable';

const OrderListSorting = () => {
  const { updateQueryParams, queryParams } = useOrdersTable();

  return (
    <Select
      onValueChange={(value) => {
        updateQueryParams({ ...queryParams, sorted_by: value, page: 1 });
      }}
      defaultValue={queryParams.sorted_by}
    >
      <SelectTrigger className="max-w-max gap-space8 border-color  h-[3.6rem]">
        <SortIcon />
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent align="end">
        <div className="max-h-[24rem] overflow-y-scroll">
          {ORDER_SORT_OPTIONS.map((item) => (
            <SelectItem key={item.id} value={item.value}>
              {item.name}
            </SelectItem>
          ))}
        </div>
      </SelectContent>
    </Select>
  );
};

export default OrderListSorting;

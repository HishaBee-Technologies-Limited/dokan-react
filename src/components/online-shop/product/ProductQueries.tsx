'use client';
import React from 'react';
import Search from '@/components/common/forms/Search';
import { FilterIcon } from '@/components/common/icons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const ProductQueries = () => {
  return (
    <div className="flex gap-space12">
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
  );
};

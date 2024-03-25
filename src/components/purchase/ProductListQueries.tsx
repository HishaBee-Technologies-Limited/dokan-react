import React from 'react';
import { Select } from '@radix-ui/react-select';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import Search from '@/components/common/forms/Search';
import { AddIcon, FilterIcon, SortIcon } from '@/components/common/icons';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ProductListQueries = () => {
  const [value, setValue] = React.useState<string>('');

  return (
    <div className="space-y-space8 w-full p-space8 border-b border-color">
      <Text title="Select Products to Sell" className="font-semibold" />

      <div className="flex gap-space12">
        <Search onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}} />
        <Button
          variant={'secondary'}
          className="!h-[4.4rem] w-[4.8rem] sm:px-space8 text-lg"
        >
          <AddIcon />
        </Button>
      </div>

      <div className="flex gap-space8 overflow-hidden">
        <Select onValueChange={setValue} defaultValue={value}>
          <SelectTrigger className="h-space32 text-xs">
            <div className="flex gap-space6 items-center ">
              <FilterIcon />
              <SelectValue placeholder="Filter By" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <div className="max-h-[24rem] overflow-y-scroll">
              <SelectItem value="mgghhexample">m@example.com </SelectItem>
              <SelectItem value="m@google.com">m@google.com</SelectItem>
              <SelectItem value="m@support.com">m@support.com</SelectItem>
            </div>
          </SelectContent>
        </Select>

        <Select onValueChange={setValue} defaultValue={value}>
          <SelectTrigger className="h-space32 text-xs">
            <div className="flex gap-space6 items-center">
              <SortIcon />
              <SelectValue placeholder="Sort By" />
            </div>
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
    </div>
  );
};

export default ProductListQueries;

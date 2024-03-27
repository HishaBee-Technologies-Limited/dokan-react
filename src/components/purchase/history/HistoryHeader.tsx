'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SortIcon } from '@/components/common/icons';
import { PageSubTitle } from '@/components/common/text';
import DatePicker from '@/components/common/DatePicker';
import { DownloadIcon } from '@/components/common/icons/DownloadIcon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const HistoryHeader = () => {
  const [value, setValue] = useState<string>('');
  const handleSort = (value: string) => {};
  return (
    <div className="flex justify-between items-center flex-wrap gap-space16">
      <PageSubTitle title="Transaction History" />

      <Button variant={'secondary'} className="sm:hidden">
        <DownloadIcon />
        PDF Download
      </Button>

      <div className="flex flex-wrap gap-space8 sm:gap-space12">
        <DatePicker
          onChange={(date) => console.log(date)}
          triggerClasses="!h-[4.8rem]"
        />
        <Select onValueChange={handleSort} defaultValue={value}>
          <SelectTrigger className="max-w-max h-[4.8rem] dark:border- border-color dark:bg-primary-90 gap-space8 dark:text-text400">
            <SortIcon />
            <SelectValue placeholder="Employee" />
          </SelectTrigger>
          <SelectContent>
            <div className="max-h-[24rem] overflow-y-scroll">
              <SelectItem value="m@example.com">m@example.com</SelectItem>
              <SelectItem value="m@google.com">m@google.com</SelectItem>
              <SelectItem value="m@support.com">m@support.com</SelectItem>
            </div>
          </SelectContent>
        </Select>
        <Button variant={'secondary'} className="hidden sm:flex">
          <DownloadIcon />
          PDF Download
        </Button>
      </div>
    </div>
  );
};

export default HistoryHeader;

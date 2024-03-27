'use client';

import React, { useState } from 'react';
import { addDays, format } from 'date-fns';

import Icon from './Icon';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type DatePickerProps = {
  presets?: boolean;
  defaultDate?: Date;
  triggerClasses?: string;
  onChange: (date: Date) => void;
  contentAlign?: 'start' | 'end' | 'center';
};

export const DatePicker = ({
  onChange,
  presets,
  triggerClasses,
  defaultDate = new Date(),
  contentAlign = 'end',
}: DatePickerProps) => {
  const [date, setDate] = useState<Date>(defaultDate);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size={'sm'}
          variant={'secondary'}
          className={cn(
            'min-w-[16rem] justify-start text-left font-normal sm:px-space8',
            !date && 'text-muted-foreground',
            triggerClasses
          )}
        >
          <Icon icon="quill:calendar-more" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align={contentAlign}
        className={`flex w-[24rem] flex-col space-y-2 ${presets ? 'p-space8' : 'p-0'}`}
      >
        {presets && (
          <Select
            onValueChange={(value) => {
              setDate(addDays(new Date(), parseInt(value)));
              onChange(addDays(new Date(), parseInt(value)));
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="0">Today</SelectItem>
              <SelectItem value="1">Tomorrow</SelectItem>
              <SelectItem value="3">In 3 days</SelectItem>
              <SelectItem value="7">In a week</SelectItem>
            </SelectContent>
          </Select>
        )}

        <div className="">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date as Date);
              onChange(date as Date);
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;

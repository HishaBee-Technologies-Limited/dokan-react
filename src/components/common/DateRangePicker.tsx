'use client';

import React from 'react';
import Icon from './Icon';
import { cn } from '@/lib/utils';
import { DateRange } from 'react-day-picker';
import { format, startOfMonth } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export type DateRangeDef = DateRange | undefined;

type DatePickerProps = {
  triggerClasses?: string;
  onChange: (date: DateRangeDef) => void;
  contentAlign?: 'start' | 'end' | 'center';
};

export const DateRangePicker = ({
  onChange,
  triggerClasses,
  contentAlign = 'end',
}: DatePickerProps) => {
  const [date, setDate] = React.useState<DateRangeDef>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          size={'sm'}
          variant={'secondary'}
          className={cn(
            'min-w-[16rem] justify-start text-left font-normal sm:px-space8',
            !date && 'text-muted-foreground',
            triggerClasses
          )}
        >
          <Icon icon="quill:calendar-more" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, 'LLL dd, y')} -{' '}
                {format(date.to, 'LLL dd, y')}
              </>
            ) : (
              format(date.from, 'LLL dd, y')
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align={contentAlign} className={`p-0`}>
        <Calendar
          initialFocus
          mode="range"
          selected={date}
          numberOfMonths={2}
          defaultMonth={date?.from}
          onSelect={(e) => {
            setDate(e);
            onChange(e);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker;

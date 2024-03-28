'use client';

import * as React from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { addDays, format } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { DatePickerWithRangePropsDef } from '@/types/Date';

export function DatePickerWithRange({
  dateRange,
  onChange,
}: DatePickerWithRangePropsDef) {
  return (
    <div className={cn('grid gap-2')}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            id="date"
            variant="secondary"
            className={cn(
              'justify-start text-left font-normal', //@TODO: remove fix-width; "w-[300px]",
              !dateRange && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, 'LLL dd, y')} -{' '}
                  {format(dateRange.to, 'LLL dd, y')}
                </>
              ) : (
                format(dateRange.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={new Date(dateRange.from ?? new Date(2022, 0, 20))}
            selected={{
              from: new Date(dateRange.from ?? new Date(2022, 0, 20)),
              to: addDays(
                new Date(dateRange.from ?? new Date(2022, 0, 20)),
                20
              ),
            }}
            onSelect={onChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

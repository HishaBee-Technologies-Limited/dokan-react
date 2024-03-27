'use client';

import React, { useState } from 'react';
import { ExpandMoreIcon } from '../icons';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';

type ISelectProps = {
  data: {
    value: string;
    label: string;
  }[]; // data is an array of objects with value and label
  searchable?: boolean;
  placeholder?: string | JSX.Element;
  onChange: (value: string) => void;
  className?: string;
  defaultValue?: string;
  triggerIcon?: JSX.Element;
};

export function Select({
  data,
  onChange,
  searchable = false,
  placeholder = 'Select..',
  className,
  defaultValue,
  triggerIcon,
}: ISelectProps) {
  const [value, setValue] = useState<string>(defaultValue || '');
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size={'sm'}
          role="combobox"
          variant="secondary"
          aria-expanded={open}
          className={`justify-between !px-space12 ${className}`}
        >
          {triggerIcon}
          {value
            ? data.find((item) => item.value === value)?.label
            : placeholder}
          <span className={`${open ? 'rotate-180' : ''} duration-300`}>
            <ExpandMoreIcon />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`p-0 w-[30rem] ${className}`}>
        <Command className="w-full">
          {searchable && (
            <>
              <CommandInput
                placeholder="Search framework..."
                className="h-[3.6rem]"
              />
              <CommandEmpty>Result Not found.</CommandEmpty>
            </>
          )}
          <CommandGroup className="max-h-[22rem] overflow-y-scroll w-full">
            {data?.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue);
                  onChange(currentValue === value ? '' : currentValue);
                  setOpen(false);
                }}
                className={`${value === item.value ? 'bg-primary-10' : ''}`}
              >
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
          {/* <Button className="w-full">Add Button</Button> */}
        </Command>
      </PopoverContent>
    </Popover>
  );
}

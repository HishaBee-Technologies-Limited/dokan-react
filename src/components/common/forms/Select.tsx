"use client"

import React, { useState } from "react"
import { ExpandMoreIcon } from "../icons"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"

type ISelectProps = {
    data: {
        value: string
        label: string
    }[]; // data is an array of objects with value and label
    searchable?: boolean;
    placeholder?: string;
    onChange: (value: string) => void;
    className?: string;
}

export function Select({ data, onChange, searchable = false, placeholder = "Select..", className }: ISelectProps) {
    const [value, setValue] = useState<string>("")
    const [open, setOpen] = useState<boolean>(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    role="combobox"
                    variant="secondary"
                    aria-expanded={open}
                    className={`w-[20rem] justify-between !px-space12 ${className}`}
                >
                    {value ? data.find((item) => item.value === value)?.label : placeholder}
                    <span className={`${open ? 'rotate-180' : ''} duration-300`}><ExpandMoreIcon /></span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className={`w-[20rem] p-0 ${className}`}>
                <Command>
                    {searchable && (<>
                        <CommandInput placeholder="Search framework..." className="h-[3.6rem]" />
                        <CommandEmpty>Result Not found.</CommandEmpty>
                    </>)}
                    <CommandGroup className="max-h-[22rem] overflow-y-scroll">
                        {data?.map((item) => (
                            <CommandItem
                                key={item.value}
                                value={item.value}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    onChange(currentValue)
                                    setOpen(false)
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
    )
}

'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SortIcon } from "@/components/common/icons";
import React from "react";

const OrderListSorting = () => {
  return (
    <Select onValueChange={() => console.log('hi')} defaultValue={''}>
      <SelectTrigger className="max-w-max gap-space8 border-color  h-[3.6rem]" >
        <SortIcon />
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent align='end' >
        <div className="max-h-[24rem] overflow-y-scroll">
          <SelectItem value="m@example.com">m@example.com</SelectItem>
          <SelectItem value="m@google.com">m@google.com</SelectItem>
          <SelectItem value="m@support.com">m@support.com</SelectItem>
        </div>
      </SelectContent>
    </Select>
  )
}

export default OrderListSorting
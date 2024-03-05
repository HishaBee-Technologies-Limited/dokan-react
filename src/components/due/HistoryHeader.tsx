"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { PageSubTitle } from "../common/text";
import DatePicker from "../common/DatePicker";
import { FilterIcon, SortIcon } from "../common/icons";
import { DownloadIcon } from "../common/icons/DownloadIcon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const HistoryHeader = () => {
  const [value, setValue] = useState<string>("");
  const handleSort = (value: string) => {};
  return (
    <div className="flex justify-between items-center flex-wrap gap-space16">
      <PageSubTitle title="Due History" />

      <div className="flex flex-wrap gap-space8 sm:gap-space12">
        <Select onValueChange={handleSort} defaultValue={value}>
          <SelectTrigger className="max-w-max h-[4.8rem] dark:border- border-color dark:bg-primary-90 gap-space8 dark:text-text400">
            <SortIcon />
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <div className="max-h-[24rem] overflow-y-scroll">
              <SelectItem value="m@example.com">m@example.com</SelectItem>
              <SelectItem value="m@google.com">m@google.com</SelectItem>
              <SelectItem value="m@support.com">m@support.com</SelectItem>
            </div>
          </SelectContent>
        </Select>
        <Select onValueChange={handleSort} defaultValue={value}>
          <SelectTrigger className="max-w-max h-[4.8rem] dark:border- border-color dark:bg-primary-90 gap-space8 dark:text-text400">
            <FilterIcon />
            <SelectValue placeholder="Filter By" />
          </SelectTrigger>
          <SelectContent>
            <div className="max-h-[24rem] overflow-y-scroll">
              <SelectItem value="m@example.com">m@example.com</SelectItem>
              <SelectItem value="m@google.com">m@google.com</SelectItem>
              <SelectItem value="m@support.com">m@support.com</SelectItem>
            </div>
          </SelectContent>
        </Select>
        <DatePicker
          onChange={(date) => console.log(date)}
          triggerClasses="!h-[4.8rem]"
        />

        <Button variant={"secondary"}>
          <DownloadIcon />
          PDF Download
        </Button>
      </div>
    </div>
  );
};

export default HistoryHeader;

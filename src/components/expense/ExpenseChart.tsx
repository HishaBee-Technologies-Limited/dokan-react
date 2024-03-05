"use client";
import React from "react";
import Card from "../common/Card";
import { Text } from "../common/text";
import DatePicker from "../common/DatePicker";

const ExpenseChart = () => {
  return (
    <Card className="h-[36rem] p-space8 sm:p-space16 shadow">
      <div className="flex flex-wrap justify-between items-center gap-space16">
        <Text
          title="মোট খরচঃ ৳ ৩০,০০০"
          className="text-sm sm:text-md !font-semibold"
        />

        <DatePicker onChange={(date) => console.log(date)} />
      </div>
    </Card>
  );
};

export default ExpenseChart;

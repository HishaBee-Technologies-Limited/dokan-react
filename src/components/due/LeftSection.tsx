"use client";
import React from "react";
import Card from "../common/Card";
import { Input } from "../ui/input";
import CustomTab from "../common/Tab";
import { Button } from "../ui/button";
import { Text } from "../common/text";
import { useDueStore } from "../../stores/useDueStore";
import { ScrollArea } from "../ui/scroll-area";
import FallBackImage from "../common/FallBackImage";
import WrapperOddList from "../common/WrapperOddList";
import CardWithSideIndicator from "../common/CardWithSideIndicator";

const tabData = [
  {
    label: "Customer",
    value: "Customer",
  },
  {
    label: "Supplier",
    value: "Supplier",
  },
  {
    label: "Employee",
    value: "Employee",
  },
];

export const LeftSection = () => {
  const activePageTab = useDueStore((state) => state.activePageTab);
  const activeUserItem = useDueStore((state) => state.activeUserItem);
  const handleDrawerOpen = useDueStore((state) => state.setDrawerState);
  const setActivePageTab = useDueStore((state) => state.setActivePageTab);
  const setActiveUserItem = useDueStore((state) => state.setActiveUserItem);

  return (
    <Card className="h-full lg:w-4/12 flex flex-col gap-space16 lg:border-r border-color lg:rounded-tr-none">
      <div className="space-y-space8 w-full">
        <CustomTab
          data={tabData}
          active={activePageTab}
          handleChange={(item) => setActivePageTab(item.value)}
          className="border-b w-full  px-space12 sm:px-space16 pt-space8"
        />

        <Card className="grid grid-cols-2  px-space12 sm:px-space16">
          <article className="border-r border-color text-center">
            <Text
              title="You’ll Give"
              variant="secondary"
              className="text-sm font-medium"
            />
            <Text
              title=" ৳ 10,000"
              className="font-semibold text-lg"
              variant="error"
            />
          </article>
          <article className=" text-center">
            <Text
              title="You’ll Get"
              variant="secondary"
              className="text-sm font-medium"
            />
            <Text
              title=" ৳ 10,000"
              className="font-semibold text-lg"
              variant="success"
            />
          </article>
        </Card>

        <div className=" px-space12 sm:px-space16">
          <Input placeholder="Search contact" />
        </div>
      </div>

      <ScrollArea className="h-[calc(100%-20.6rem)] overflow-y-scroll  px-space12 sm:px-space16">
        <WrapperOddList>
          {Array(40)
            .fill(0)
            .map((_, index) => (
              <CardWithSideIndicator
                key={index}
                active={index === activeUserItem}
                onClick={() => setActiveUserItem(index)}
              >
                <div className="w-full flex items-center gap-space8">
                  <FallBackImage src="" fallback="MM" />

                  <div className="w-full flex items-center justify-between gap-space12">
                    <article>
                      <Text
                        title="নিজাম উদ্দিন"
                        className="!text-md font-medium"
                      />
                      <Text title="01542141414" variant="muted" />
                    </article>

                    <article>
                      <Text
                        title="+৳ 12,00"
                        className="font-medium"
                        variant="success"
                      />
                      <Text
                        title="Taken"
                        variant="white"
                        className="text-xs bg-success-100 px-space12 py-[.2rem] rounded-full dark:!text-primary-100"
                      />
                    </article>
                  </div>
                </div>
              </CardWithSideIndicator>
            ))}
        </WrapperOddList>
      </ScrollArea>

      <div className="p-space12 sm:p-space16 border-t border-primary-20 dark:border-primary-80">
        <Button
          className="w-full"
          onClick={() =>
            handleDrawerOpen({ open: true, header: `Add ${activePageTab}` })
          }
        >
          Add {activePageTab}
        </Button>
      </div>
    </Card>
  );
};

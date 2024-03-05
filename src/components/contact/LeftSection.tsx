"use client";
import React from "react";
import Card from "../common/Card";
import { Input } from "../ui/input";
import CustomTab from "../common/Tab";
import { Button } from "../ui/button";
import { Text } from "../common/text";
import { ScrollArea } from "../ui/scroll-area";
import { useContactStore } from "../../stores/useContactStore";
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
  const {
    activeTab,
    activeUserItem,
    setActiveTab,
    setActiveUserItem,
    setContactDrawerState,
  } = useContactStore((state) => state);

  return (
    <Card className="h-full lg:w-4/12 flex flex-col gap-space16">
      <div className="space-y-space8 w-full">
        <CustomTab
          data={tabData}
          active={activeTab}
          handleChange={(item) => setActiveTab(item.value)}
          className="border-b w-full px-space16 pt-space8"
        />
        <div className="px-space16">
          <Input placeholder="Search contact" />
        </div>
      </div>

      <ScrollArea className="h-[calc(100%-20.6rem)] px-space16">
        <WrapperOddList>
          {Array(40)
            .fill(0)
            .map((_, index) => (
              <CardWithSideIndicator
                key={index}
                active={index === activeUserItem}
                onClick={() => setActiveUserItem(index)}
              >
                <div className="flex items-center gap-space8">
                  <FallBackImage src="" fallback="MM" />
                  <article>
                    <Text
                      title="নিজাম উদ্দিন"
                      className="!text-md font-medium"
                    />
                    <Text title="01542141414" variant="muted" />
                  </article>
                </div>
              </CardWithSideIndicator>
            ))}
        </WrapperOddList>
      </ScrollArea>

      <div className="p-space16 border-t border-primary-20 dark:border-primary-80">
        <Button
          className="w-full"
          onClick={() =>
            setContactDrawerState({ open: true, header: `Add ${activeTab}` })
          }
        >
          Add {activeTab}
        </Button>
      </div>
    </Card>
  );
};

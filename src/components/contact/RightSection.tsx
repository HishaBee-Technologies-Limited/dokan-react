import React from "react";
import Card from "../common/Card";
import { Button } from "../ui/button";
import { Text } from "../common/text";
import { useContactStore } from "../../stores/useContactStore";
import FallBackImage from "../common/FallBackImage";
import { ContactTable } from "./ContactTable";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export const RightSection = () => {
  const { activeTab, setContactDrawerState } = useContactStore(
    (state) => state
  );

  return (
    <Card className="h-full lg:w-8/12">
      <div className="px-space16 my-space8 border-b border-primary-20 dark:border-primary-80">
        <div className="flex gap-space16 items-center justify-between py-space8">
          <div className="flex items-center gap-space8">
            <FallBackImage src="" fallback="MM" />
            <article>
              <Text title="নিজাম উদ্দিন" className="!text-lg font-medium" />
              <Text
                title="Customer  ।  01514252525 | abc@mail.com"
                variant="muted"
              />
            </article>
          </div>

          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() =>
              setContactDrawerState({ open: true, header: `Edit ${activeTab}` })
            }
          >
            Edit
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[calc(100%-9rem)] pb-space16 px-space16">
        <ContactTable />

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Card>
  );
};

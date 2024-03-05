"use client";
import { z } from "zod";
import React from "react";
import { SellEnum } from "../../enum/sell";
import { useForm } from "react-hook-form";
import Card from "../common/Card";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { Text } from "../common/text";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePurchaseStore } from "../../stores/usePurchase";
import { ArrowForwardIcon } from "../common/icons";
import ProductFiledRow from "../sell/ProductFiledRow";
import ProductSellCalculation from "../sell/ProductSellCalculation";
import { ScrollArea } from "../ui/scroll-area";

const formSchema = z.object({
  quantity: z.string().min(1, {
    message: "This field is required.",
  }),
  unit_price: z.string().min(1, {
    message: "This field is required.",
  }),
  total: z.string(),
  delivery_charge: z.string(),
  discount: z.string(),
  discount_type: z.string(),
});

export const RightSection = () => {
  const handleDialogOpen = usePurchaseStore((state) => state.setDialogState);
  const handleDrawerOpen = usePurchaseStore((state) => state.setDrawerState);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: "",
      unit_price: "",
      total: "",
      delivery_charge: "",
      discount: "",
      discount_type: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("data------------", data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="lg:pl-space12 lg:border-l border-color h-full lg:w-8/12 space-y-space16"
      >
        <ScrollArea className="w-full h-[calc(100%-30rem)] overflow-y-scroll shadow p-space8 pt-0 relative rounded-md background">
          <Text
            title="Products Added for Purchase"
            className="font-semibold sticky top-0 z-20 background pt-space8"
          />

          <div className="space-y-space12">
            <ProductFiledRow form={form} />
            <ProductFiledRow form={form} />
            <ProductFiledRow form={form} />
            <ProductFiledRow form={form} />
            <ProductFiledRow form={form} />
            <ProductFiledRow form={form} />
          </div>
        </ScrollArea>

        <div className="space-y-space8">
          <ProductSellCalculation form={form} />

          <Card className="p-space8 py-space12 rounded-none space-y-space8">
            <Text title="মূল্য পরিশোধ পদ্ধতি" className="text-sm" />

            <div className="flex gap-space8 sm:gap-space16">
              <Button
                size="sm"
                type="submit"
                className="w-full"
                onClick={() =>
                  handleDrawerOpen({
                    open: true,
                    header: SellEnum.CONFIRM_PAYMENT,
                  })
                }
              >
                নগদ টাকা <ArrowForwardIcon />
              </Button>
              <Button
                size="sm"
                type="submit"
                className="w-full"
                onClick={() =>
                  handleDrawerOpen({
                    open: true,
                    header: SellEnum.MONEY_GIVEN_ENTRY,
                  })
                }
              >
                বাকি <ArrowForwardIcon />
              </Button>
              <Button
                size="sm"
                type="submit"
                className="w-full"
                onClick={() =>
                  handleDialogOpen({ open: true, header: SellEnum.QR_CODE })
                }
              >
                নিজস্ব QR কোড <ArrowForwardIcon />
              </Button>
            </div>
          </Card>
        </div>
      </form>
    </Form>
  );
};

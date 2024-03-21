"use client";
import { z } from "zod";
import React from "react";
import { SellEnum } from "@/enum/sell";
import { useForm } from "react-hook-form";
import Card from "@/components/common/Card";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/common/text";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePurchaseStore } from "@/stores/usePurchase";
import { ArrowForwardIcon } from "@/components/common/icons";
import ProductFiledRow from "@/components/sell/ProductFiledRow";
import ProductSellCalculation from "@/components/sell/ProductSellCalculation";
import { ScrollArea } from "../ui/scroll-area";
import { usePurchase } from "@/stores/usePurchaseStore";

const formSchema = z.object({
  quantity: z.string(),
  unit_price: z.string().optional(),
  total: z.string(),
  delivery_charge: z.string(),
  discount: z.string(),
  discount_type: z.string(),
});

export const RightSection = () => {
  const handleDialogOpen = usePurchaseStore((state) => state.setDialogState);
  const handleDrawerOpen = usePurchaseStore((state) => state.setDrawerState);
  const products = usePurchase((state) => state.products);
  const setProducts = usePurchase((state) => state.setProducts);

  const form = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: [],
    },
  });

  function onSubmit(data: any) {
    console.log("data------------", data);
    // setProducts([
    //   ...products,
    //   {
    //     ...products.find(product => product.),
    //     ["product_calculations"]: {
    //       ["total"]: unitPrice * quantity,
    //       ["quantity"]: quantity,
    //     },
    //   },
    // ]);
  }
  console.log(form.formState.errors);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="lg:pl-space12 border-color space-y-space16 h-full lg:w-8/12 lg:border-l"
      >
        <ScrollArea className="p-space8 background relative h-[calc(100%-30rem)] w-full overflow-y-scroll rounded-md pt-0 shadow">
          <Text
            title="Products Added for Purchase"
            className="background pt-space8 sticky top-0 z-20 font-semibold"
          />

          <div className="space-y-space12">
            {products.map((product, index) => (
              <ProductFiledRow
                key={product.id}
                form={form}
                data={product}
                {...{ index }}
              />
            ))}
          </div>
        </ScrollArea>

        <div className="space-y-space8">
          <ProductSellCalculation form={form} />

          <Card className="p-space8 py-space12 space-y-space8 rounded-none">
            <Text title="মূল্য পরিশোধ পদ্ধতি" className="text-sm" />

            <div className="gap-space8 sm:gap-space16 flex">
              <Button
                size="sm"
                type="submit"
                className="w-full"
                // onClick={() =>
                //   handleDrawerOpen({
                //     open: true,
                //     header: SellEnum.CONFIRM_PAYMENT,
                //   })
                // }
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

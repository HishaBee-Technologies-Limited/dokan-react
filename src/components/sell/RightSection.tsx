'use client';
import { z } from 'zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Card from '@/components/common/Card';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowForwardIcon } from '@/components/common/icons';
import ProductFiledRow, {
  IProductPurchase,
} from '@/components/sell/ProductFiledRow';
import ProductSellCalculation from '@/components/sell/ProductSellCalculation';
import { useSellStore } from '@/stores/useSellStore';
import { SellEnum } from '@/enum/sell';
import { ScrollArea } from '../ui/scroll-area';
import { IProduct } from '@/types/product';
import { toast } from 'sonner';

const formSchema = z.object({
  quantity: z.string().min(1, {
    message: 'This field is required.',
  }),
  unit_price: z.string().min(1, {
    message: 'This field is required.',
  }),
  total: z.string(),
  delivery_charge: z.string(),
  discount: z.string(),
  discount_type: z.string(),
});

export const RightSection = () => {
  const handleSellDialog = useSellStore((state) => state.setSellDialogState);
  const handleSellDrawer = useSellStore((state) => state.setSellDrawerState);
  const [sellType, setSellType] = useState('');
  const products = useSellStore((state) => state.products);
  const setCalculatedProducts = useSellStore(
    (state) => state.setCalculatedProducts
  );
  const calculatedProducts = useSellStore((state) => state.calculatedProducts);

  const form = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: [],
      delivery_charge: 0,
      discount: 0,
    },
  });

  function onSubmit(data: any) {
    const updatedProducts = products.map((product) => {
      if (
        data.products.some(
          (prod: IProduct) => Object.keys(prod)[0] === `product-${product.id}`
        )
      ) {
        const updatedProduct = Object.values(
          data.products.find(
            (prod: IProduct) => Object.keys(prod)[0] === `product-${product.id}`
          )
        )[0];
        return {
          ...product,
          calculatedAmount: updatedProduct,
        };
      }
    });

    console.log(updatedProducts.length);

    if (!updatedProducts.length) {
      toast.warning('No Product Selected or Total is 0');
    }
    if (updatedProducts.length) {
      sellType == 'cash'
        ? handleSellDrawer({
            open: true,
            header: SellEnum.CONFIRM_PAYMENT,
          })
        : handleSellDrawer({
            open: true,
            header: SellEnum.MONEY_GIVEN_ENTRY,
          });
      setCalculatedProducts({
        products: updatedProducts as IProductPurchase[],
        deliveryCharge: data.delivery_charge,
        discount: data.discount,
        totalPrice: data.totalPrice,
        discountType: data.discount_type,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="lg:pl-space12 lg:border-l border-color h-full lg:w-8/12 space-y-space16"
      >
        <ScrollArea className="w-full h-[calc(100%-30rem)] overflow-y-scroll shadow p-space8 pt-0 relative background rounded-md">
          <Text
            title="Products Added for Sell"
            className="font-semibold sticky top-0 z-20 background pt-space8"
          />

          <div className="space-y-space12">
            {products.map((product, index) => (
              <ProductFiledRow
                key={product.unique_id}
                data={product}
                {...{ index, form }}
              />
            ))}
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
                onClick={() => {
                  setSellType('cash');
                }}
              >
                নগদ টাকা <ArrowForwardIcon />
              </Button>
              <Button
                size="sm"
                type="submit"
                className="w-full"
                onClick={() => {
                  console.log('ccc', calculatedProducts);
                  setSellType('due');
                }}
              >
                বাকি <ArrowForwardIcon />
              </Button>
              {/* <Button
                size="sm"
                type="submit"
                className="w-full"
                onClick={() =>
                  handleSellDialog({ open: true, header: SellEnum.QR_CODE })
                }
              >
                নিজস্ব QR কোড <ArrowForwardIcon />
              </Button> */}
            </div>
          </Card>
        </div>
      </form>
    </Form>
  );
};

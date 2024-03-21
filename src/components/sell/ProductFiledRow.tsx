import React, { useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/common/text";
import { UseFormReturn } from "react-hook-form";
import { Image } from "@/components/common/Image";
import { CancelIcon } from "@/components/common/icons";
import {
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { IProduct } from "@/types/product";
import { DEFAULT_PRODUCT_QUANTITY } from "@/lib/constants/purchase";
import { usePurchase } from "@/stores/usePurchaseStore";

export interface IProductPurchase extends IProduct {
  product_calculations?: { quantity: number; total: number };
}
type IProps = {
  form: UseFormReturn<any>;
  data?: IProductPurchase;
  index: number;
};

const ProductFiledRow = (props: IProps) => {
  const calculatedProducts = usePurchase((state) => state.calculatedProducts);
  const setCalculatedProducts = usePurchase(
    (state) => state.setCalculatedProducts
  );
  const quantity =
    props.data &&
    props.form.watch(
      `products.${props.index}.product-${props.data?.id}.quantity`
    );
  const unitPrice =
    props.data &&
    props.form.watch(
      `products.${props.index}.product-${props.data?.id}.unit_price`
    );
  const productIndex = useMemo(() => {
    return calculatedProducts.findIndex(
      (product) => product.id === props.data?.id
    );
  }, [props.data, calculatedProducts]);

  useEffect(() => {
    props.data &&
      props.form.setValue(
        `products.${props.index}.product-${props.data?.id}.total`,
        String(Number(unitPrice) * Number(quantity))
      );
  }, [unitPrice, quantity, productIndex]);

  useEffect(() => {
    if (props.data) {
      props.form.setValue(
        `products.${props.index}.product-${props.data.id}.quantity`,
        DEFAULT_PRODUCT_QUANTITY
      );
      props.form.setValue(
        `products.${props.index}.product-${props.data.id}.unit_price`,
        String(props.data?.cost_price)
      );
    }
  }, [props.data, props.form]);

  return (
    <div className="border-b border-dashed border-color pt-space8 pb-space12 space-y-space6 ">
      <div className="flex justify-between gap-space10 items-start">
        <div className="flex items-center gap-space12">
          <Image
            src=""
            alt=""
            height={40}
            width={40}
            wrapperClasses="border border-color rounded-md p-space4"
          />
          <article>
            <Text title={props.data?.name} className="font-medium" />
            <Text
              title={`Current Stock ${props.data?.stock}`}
              className="text-xs bg-action-40 dark:bg-primary-80 rounded-full px-space10 py-space4 max-w-max "
            />
          </article>
        </div>

        <Button type="button" size={"icon"} variant={"danger"}>
          <CancelIcon />
        </Button>
      </div>

      <div className="flex gap-space12">
        <FormField
          control={props.form.control}
          name={`products.${props.index}.product-${props.data?.id}.quantity`}
          render={({ field }) => (
            <FormItem className="space-y-0 w-full">
              <FormLabel>
                Quantity <span className="text-error-100">*</span>{" "}
              </FormLabel>
              <FormControl>
                <Input placeholder="Quantity" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={props.form.control}
          name={`products.${props.index}.product-${props.data?.id}.unit_price`}
          render={({ field }) => (
            <FormItem className="space-y-0 w-full">
              <FormLabel>
                Unit Price <span className="text-error-100">*</span>{" "}
              </FormLabel>
              <FormControl>
                <Input disabled={true} placeholder="Unit Price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={props.form.control}
          name={`products.${props.index}.product-${props.data?.id}.total`}
          render={({ field }) => (
            <FormItem className="space-y-0 w-full">
              <FormLabel>Total</FormLabel>
              <FormControl>
                <Input placeholder="Total" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ProductFiledRow;

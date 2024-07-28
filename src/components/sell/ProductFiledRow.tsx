import React, { useEffect, useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { UseFormReturn } from 'react-hook-form';
import { Image } from '@/components/common/Image';
import { CancelIcon } from '@/components/common/icons';
import {
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { IProduct } from '@/types/product';
import { DEFAULT_PRODUCT_QUANTITY } from '@/lib/constants/purchase';
import { useSellStore } from '@/stores/useSellStore';
import { percentage } from '@/lib/utils';

export interface IProductPurchase extends IProduct {
  calculatedAmount?: {
    quantity: number;
    total: number;
    unit_price: number;
    unit_cost?: number;
  };
}
type IProps = {
  form: UseFormReturn<any>;
  data?: IProductPurchase;
  index: number;
};

const ProductFiledRow = (props: IProps) => {
  const setProducts = useSellStore((state) => state.setProducts);
  const products = useSellStore((state) => state.products);
  const transaction = useSellStore((state) => state.transaction);

  const currentPurchase = useSellStore((state) => state.currentSell);

  const unitPriceWithExtras = useMemo(() => {
    if (props.data?.selling_price) {
      if (props.data?.discount_type === 'PERCENT') {
        const priceBeforeVat =
          props.data?.selling_price -
          percentage(props.data?.selling_price, props.data.discount);
        const priceAfterVat =
          priceBeforeVat + percentage(priceBeforeVat, props.data.vat_percent);
        return priceAfterVat;
      } else {
        const priceBeforeVat = props.data?.selling_price - props.data.discount;
        const priceAfterVat =
          priceBeforeVat + percentage(priceBeforeVat, props.data.vat_percent);
        return priceAfterVat;
      }
    } else {
      return 0;
    }
  }, [props.data]);

  /**
   * This watch controls the onchange calculation on the viewport
   */
  const quantityWatch = props.form.watch(
    `products.${props.index}.product-${props.data?.id}.quantity`
  );

  const totalWatch = props.form.watch(
    `products.${props.index}.product-${props.data?.id}.total`
  );

  useEffect(() => {
    const quantityValue = props.form.getValues(
      `products.${props.index}.product-${props.data?.id}.quantity`
    );
    if (quantityValue) {
      props.form.setValue(
        `products.${props.index}.product-${props.data?.id}.unit_price`,
        totalWatch / quantityValue
      );
    }
  }, [totalWatch]);
  const handleProductDeleteFromSelections = () => {
    /**
     * unregister product item from the form array to maintain the calculation
     * Set the filtered products to update the current view
     */

    props.form.setValue(
      'products',
      props.form
        .watch('products')
        .filter(
          (prod: any) => Object.keys(prod)[0] !== `product-${props.data?.id}`
        )
    );
    setProducts(products.filter((product) => product.id !== props.data?.id));
  };

  useEffect(() => {
    /**
     * get the required values for the total price calculation for every product
     */
    const quantityValue = props.form.getValues(
      `products.${props.index}.product-${props.data?.id}.quantity`
    );
    const unitPrice = props.form.getValues(
      `products.${props.index}.product-${props.data?.id}.unit_price`
    );

    if (props.data?.wholesale_amount) {
      if (Number(quantityValue) >= props.data?.wholesale_amount!) {
        props.form.setValue(
          `products.${props.index}.product-${props.data?.id}.unit_price`,
          String(props.data?.wholesale_price)
        );
      } else {
        props.form.setValue(
          `products.${props.index}.product-${props.data?.id}.unit_price`,
          String(unitPriceWithExtras)
        );
      }
    } else {
      props.form.setValue(
        `products.${props.index}.product-${props.data?.id}.unit_price`,
        String(unitPriceWithExtras)
      );
    }
    if (quantityValue && unitPrice) {
      /**
       * set the total value based on the change of the quantity
       */

      if (props.data?.wholesale_amount) {
        if (Number(quantityValue) >= props.data?.wholesale_amount!) {
          props.form.setValue(
            `products.${props.index}.product-${props.data?.id}.total`,
            Number(quantityValue) * Number(props.data?.wholesale_price)
          );
        }
        if (Number(quantityValue) < props.data?.wholesale_amount) {
          props.form.setValue(
            `products.${props.index}.product-${props.data?.id}.total`,
            Number(quantityValue) * unitPriceWithExtras
          );
        }
      } else {
        props.form.setValue(
          `products.${props.index}.product-${props.data?.id}.total`,
          Number(quantityValue) * unitPriceWithExtras
        );
      }
    }
  }, [quantityWatch]);

  useEffect(() => {
    /**
     * set the Default values of the form
     */
    props.form.setValue(
      `products.${props.index}.product-${props.data?.id}.quantity`,
      Number(
        transaction.find(
          (transaction) =>
            transaction.shop_product_by_uniqueid?.id === props.data?.id
        )?.quantity
      )
        ? Number(
            transaction.find(
              (transaction) =>
                transaction.shop_product_by_uniqueid?.id === props.data?.id
            )?.quantity
          )
        : DEFAULT_PRODUCT_QUANTITY
    );
    props.form.setValue(
      `products.${props.index}.product-${props.data?.id}.unit_price`,
      String(unitPriceWithExtras)
    );
    console.log(
      Number(
        transaction.find(
          (transaction) =>
            transaction.shop_product_by_uniqueid?.id === props.data?.id
        )?.quantity
      ),
      props.data
    );
    setTimeout(() => {
      props.form.setFocus(
        `products.${props.index}.product-${props.data?.id}.total`
      );
    }, 50);
  }, [unitPriceWithExtras, props.form, transaction]);

  useEffect(() => {
    setTimeout(() => {
      props.form.setValue('discount', currentPurchase?.discount, {
        shouldDirty: true,
        shouldTouch: true,
      });
      props.form.setValue(
        `products.${props.index}.product-${props.data?.id}.unit_cost`,
        String(props.data?.calculatedAmount?.unit_cost)
      );
      props.form.setValue('discount_type', currentPurchase?.discount_type);
      props.form.setValue('delivery_charge', currentPurchase?.extra_charge);
      // props.form.setFocus(`discount`);
    }, 50);
  }, [props.form, currentPurchase]);

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

        <Button
          type="button"
          onClick={handleProductDeleteFromSelections}
          size={'icon'}
          variant={'danger'}
        >
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
                Quantity <span className="text-error-100">*</span>{' '}
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
                Unit Price <span className="text-error-100">*</span>{' '}
                {props.data?.wholesale_amount &&
                  Number(quantityWatch) >= props.data?.wholesale_amount && (
                    <span className="text-orange-400 text-xs">[Bulk Rate]</span>
                  )}{' '}
                {props.data?.discount && (
                  <span className="text-orange-400 text-xs">[Discount]</span>
                )}{' '}
                {!!props.data?.vat_percent && (
                  <span className="text-orange-400 text-xs">[Vat]</span>
                )}
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

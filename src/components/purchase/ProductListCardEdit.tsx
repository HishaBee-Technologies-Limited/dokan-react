import React, { useEffect, useMemo } from 'react';
import { Image } from '@/components/common/Image';
import { IProducts } from '@/types/purchase';
import { Text } from '@/components/common/text';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { DEFAULT_PRODUCT_QUANTITY } from '@/lib/constants/purchase';
import { Button } from '../ui/button';
import { CancelIcon } from '@/components/common/icons';
import { calculateGrandTotal, calculateTotal } from '@/lib/utils';
import { usePurchase } from '@/stores/usePurchaseStore';

function ProductListCardEdit(props: {
  data: IProducts;
  form: any;
  index: number;
  removeItemFromProduct: () => void;
}) {
  const currentPurchase = usePurchase((state) => state.currentPurchase);

  /**
   * This watch controls the onchange calculation on the viewport
   */
  const quantityWatch = props.form?.watch(
    `products.${props.index}.product-${props.data?.unique_id}.quantity`
  );

  const products = props.form?.watch('products');

  /**
   * calculating the total price from the selected and entered product quantity
   */
  const totalPrice = products?.reduce(
    (prev: number, p: { total: string }[]) => {
      prev = prev + Number(Object.values(p)[0].total);
      return prev;
    },
    0
  );

  // const handleDelete = () => {
  //   const filteredProducts = products.filter((prod) => console.log(prod));
  // };

  useEffect(() => {
    const priceAmount = Math.round(
      calculateGrandTotal(
        currentPurchase?.discount_type,
        totalPrice,
        currentPurchase?.extra_charge!,
        currentPurchase?.discount!
      ) ?? 0
    );
    props.form.setValue('amount', priceAmount);
  }, [totalPrice]);

  useEffect(() => {
    /**
     * set the Default values of the form
     */
    props.form?.setValue(
      `products.${props.index}.product-${props.data?.unique_id}.quantity`,
      props.data.quantity
    );
    props.form?.setValue(
      `products.${props.index}.product-${props.data?.unique_id}.unit_cost`,
      String(props.data.unit_cost)
    );
  }, [props.data, props.form]);

  useEffect(() => {
    /**
     * get the required values for the total price calculation for every product
     */
    const quantityValue = props.form?.getValues(
      `products.${props.index}.product-${props.data?.unique_id}.quantity`
    );
    const unitPrice = props.form?.getValues(
      `products.${props.index}.product-${props.data?.unique_id}.unit_cost`
    );

    if (quantityValue && unitPrice) {
      /**
       * set the total value base on the change of the quantity
       */
      props.form?.setValue(
        `products.${props.index}.product-${props.data?.unique_id}.total`,
        Number(quantityValue) * Number(unitPrice)
      );
    }
  }, [quantityWatch]);
  return (
    <div key={props.data?.unique_id} className="rounded p-space8">
      <div className="flex justify-between">
        <div className="flex items-center gap-space8">
          <Image
            src={props.data.product?.image_url}
            height={32}
            width={32}
            alt=""
          />

          <Text title={props.data?.name} />
        </div>

        <Button
          type="button"
          onClick={() => {
            console.log('dd');
            props.removeItemFromProduct();
          }}
          className="h-[20px]"
          size={'icon'}
          variant={'danger'}
        >
          <CancelIcon />
        </Button>
      </div>

      <div className="flex gap-space12">
        <FormField
          control={props.form?.control}
          name={`products.${props.index}.product-${props.data?.unique_id}.quantity`}
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
          control={props.form?.control}
          name={`products.${props.index}.product-${props.data?.unique_id}.unit_cost`}
          render={({ field }) => (
            <FormItem className="space-y-0 w-full">
              <FormLabel>
                Unit Price <span className="text-error-100">*</span>{' '}
              </FormLabel>
              <FormControl>
                <Input disabled={true} placeholder="Unit Price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={props.form?.control}
          name={`products.${props.index}.product-${props.data?.unique_id}.total`}
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
}

export default ProductListCardEdit;

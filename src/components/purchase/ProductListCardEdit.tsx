import React, { useEffect } from 'react';
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

function ProductListCardEdit(props: {
  product: IProducts;
  form: any;
  index: number;
}) {
  console.log(props);
  /**
   * This watch controls the onchange calculation on the viewport
   */
  const quantityWatch = props.form?.watch(
    `products.${props.index}.product-${props.product.product.id}.quantity`
  );

  useEffect(() => {
    /**
     * set the Default values of the form
     */
    props.form?.setValue(
      `products.${props.index}.product-${props.product.product.id}.quantity`,
      DEFAULT_PRODUCT_QUANTITY
    );
    props.form?.setValue(
      `products.${props.index}.product-${props.product?.product.id}.unit_price`,
      String(props.product.product.cost_price)
    );
  }, [props.product, props.form]);

  useEffect(() => {
    /**
     * get the required values for the total price calculation for every product
     */
    const quantityValue = props.form?.getValues(
      `products.${props.index}.product-${props.product.product.id}.quantity`
    );
    const unitPrice = props.form?.getValues(
      `products.${props.index}.product-${props.product.product.id}.unit_price`
    );

    if (quantityValue && unitPrice) {
      /**
       * set the total value base on the change of the quantity
       */
      props.form?.setValue(
        `products.${props.index}.product-${props.product.product.id}.total`,
        Number(quantityValue) * Number(unitPrice)
      );
    }
  }, [quantityWatch]);
  return (
    <div key={props.product.unique_id} className="rounded p-space8">
      <div className="flex items-center gap-space8">
        <Image
          src={props.product.product.image_url}
          height={32}
          width={32}
          alt=""
        />

        <Text title={props.product.name} />
      </div>

      <div className="flex gap-space12">
        <FormField
          control={props.form?.control}
          name={`products.${props.index}.product-${props.product.product.id}.quantity`}
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
          name={`products.${props.index}.product-${props.product.product.id}.unit_price`}
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
          name={`products.${props.index}.product-${props.product.product.id}.total`}
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

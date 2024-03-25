import React from 'react';
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

type IProps = {
  form: UseFormReturn<any>;
  data?: any;
};

const ProductFiledRow = (props: IProps) => {
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
            <Text title="কোকাকোলা ৪০০ মিলি" className="font-medium" />
            <Text
              title="Current Stock 500"
              className="text-xs bg-action-40 dark:bg-primary-80 rounded-full px-space10 py-space4 max-w-max "
            />
          </article>
        </div>

        <Button type="button" size={'icon'} variant={'danger'}>
          <CancelIcon />
        </Button>
      </div>

      <div className="flex gap-space12">
        <FormField
          control={props.form.control}
          name="quantity"
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
          name="unit_price"
          render={({ field }) => (
            <FormItem className="space-y-0 w-full">
              <FormLabel>
                Unit Price <span className="text-error-100">*</span>{' '}
              </FormLabel>
              <FormControl>
                <Input placeholder="Unit Price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={props.form.control}
          name="total"
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

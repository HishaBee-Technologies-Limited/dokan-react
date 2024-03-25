import React from 'react';
import Card from '@/components/common/Card';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { Text } from '@/components/common/text';
import {
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type IProps = {
  form: UseFormReturn<any>;
  data?: any;
};

const ProductSellCalculation = (props: IProps) => {
  const { form } = props;
  return (
    <Card className="p-space8 shadow space-y-space4">
      <article className="flex justify-between items-center gap-space8 py-space4 border-b border-dashed border-color">
        <Text title="Total" className="text-sm" />
        <Text title="৳ 0" className="font-medium" />
      </article>

      <div className="border-b border-dashed border-color">
        <div className="flex justify-between items-center gap-space8 py-space4">
          <Text title="Discount" className="text-sm" />

          <Card className="flex justify-between border border-color w-[20rem] gap-space4 dark:!bg-primary-100">
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem className="space-y-0 max-w-[14rem]">
                  <FormControl>
                    <Input
                      placeholder="Discount"
                      className="h-[3.6rem] border-0"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discount_type"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-0 h-[3.6rem] px-space4 max-w-[6rem]">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent align="end" side="top">
                      <SelectItem value="m@example.com">TK</SelectItem>
                      <SelectItem value="m@google.com">$</SelectItem>
                      <SelectItem value="m@support.com">@</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </Card>
        </div>

        <div className="flex justify-between items-center gap-space8 py-space4">
          <Text title="Delivery Charge" className="text-sm" />
          <FormField
            control={form.control}
            name="delivery_charge"
            render={({ field }) => (
              <FormItem className="space-y-0 w-[20rem]">
                <FormControl>
                  <Input
                    placeholder="Delivery Charge"
                    className="h-[3.6rem]"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>

      <article className="flex justify-between items-center gap-space8 py-space4 border-t border-dashed border-color">
        <Text title="Grand Total" className="text-sm" />
        <Text title="৳ 50" variant="error" className="text-lg font-medium" />
      </article>
    </Card>
  );
};

export default ProductSellCalculation;

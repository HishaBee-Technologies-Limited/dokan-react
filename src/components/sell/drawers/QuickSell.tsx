import { z } from 'zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import Icon from '@/components/common/Icon';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { useSellStore } from '@/stores/useSellStore';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from '@/components/common/DatePicker';
import { DrawerFooter } from '@/components/common/Drawer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { SellEnum } from '@/enum/sell';

const cashType = [
  { value: 'cash', label: 'নগদ টাকা' },
  { value: 'due', label: 'বাকি' },
  { value: 'bank', label: 'বিকাশ / নগদ ' },
];

const formSchema = z.object({
  customer: z.string(),
  amount: z.string().min(1, {
    message: 'this field is required.',
  }),
  profit: z.string(),
  details: z.string(),
  images: z.string(),
  cash_type: z.string(),
});

const QuickSell = () => {
  const closeDrawer = useSellStore((state) => state.setSellDrawerState);
  const openSuccessDialog = useSellStore((state) => state.setSellDialogState);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer: '',
      amount: '',
      details: '',
      profit: '',
      images: '',
      cash_type: '',
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    closeDrawer({ open: false });
    openSuccessDialog({ open: true, header: SellEnum.SUCCESSFUL });
    console.log('data------------', data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-space12">
        <DatePicker
          onChange={() => {}}
          contentAlign={'center'}
          triggerClasses={'w-full justify-center'}
        />

        <FormField
          control={form.control}
          name="cash_type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>মূল্য পরিশোধ পদ্ধতি</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-space8"
                >
                  {cashType.map((item) => (
                    <FormItem
                      key={item.value}
                      className={`flex rounded-md border border-color py-space8 px-space12 gap-space8 w-full ${form.watch('cash_type') === item.value ? 'background border-primary-100 dark:border-primary-80' : 'bg-primary-10 dark:bg-primary-70'}`}
                    >
                      <FormControl>
                        <RadioGroupItem value={item.value} />
                      </FormControl>
                      <FormLabel className="font-normal w-full">
                        <Text title={item.label} className="font-medium" />
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Amount <span className="text-error-100">*</span>{' '}
              </FormLabel>
              <FormControl>
                <Input type="number" placeholder="Amount" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="profit"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Profit" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="customer"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Customer" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <div className="max-h-[24rem] overflow-y-scroll">
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                  </div>

                  {/* <Button
                                        variant={'secondary'}
                                        onClick={() => handleAddNewCategory({ open: true, header: ExpenseEnum.ADD_NEW_CATEGORY })}
                                        className="border-x-0 border-b-0 rounded-none w-full sticky -bottom-space6" >
                                        Add Customer
                                    </Button> */}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <div className="h-[4.4rem] flex  items-center gap-space8">
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem className="w-[calc(100%-5.2rem)] mt-space8">
                <FormControl>
                  <Input placeholder="Details" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="images"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-[4.4rem] h-full">
                <FormControl>
                  <>
                    <input
                      id="image"
                      type="file"
                      className="hidden"
                      {...field}
                    />
                    <Label
                      htmlFor="image"
                      className="cursor-pointer border border-color w-full h-full rounded-md flex items-center justify-center dark:bg-primary-100 dark:text-primary-40"
                    >
                      <Icon icon="tabler:link-plus" height={24} width={24} />
                    </Label>
                  </>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <DrawerFooter>
          <Button type="submit" className="w-full">
            Amount Recieved
          </Button>
        </DrawerFooter>
      </form>
    </Form>
  );
};

export default QuickSell;

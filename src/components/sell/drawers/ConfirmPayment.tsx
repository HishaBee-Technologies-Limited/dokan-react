import { z } from 'zod';
import React from 'react';
import { SellEnum } from '@/enum/sell';
import { useForm } from 'react-hook-form';
import Icon from '@/components/common/Icon';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { Switch } from '@/components/ui/switch';
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

const formSchema = z.object({
  amount: z.string().min(1, {
    message: 'this field is required.',
  }),
  note: z.string(),
  details: z.string(),
  images: z.string(),
  cash_type: z.string(),
  customer_info: z.boolean().default(false).optional(),
  customer_number: z.string().optional(),
  customer: z.string(),
  employee_info: z.boolean().default(false).optional(),
  employee_number: z.string().optional(),
  employee: z.string().optional(),
});

const ConfirmPayment = () => {
  const closeDrawer = useSellStore((state) => state.setSellDrawerState);
  const openSuccessDialog = useSellStore((state) => state.setSellDialogState);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
      details: '',
      note: '',
      images: '',
      cash_type: '',
      customer_info: false,
      customer_number: '',
      customer: '',
      employee_info: false,
      employee_number: '',
      employee: '',
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
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Note" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormField
            control={form.control}
            name="customer_info"
            render={({ field }) => (
              <FormItem className="flex justify-between items-center gap-space8">
                <FormLabel>
                  <Text title="Customer information" className="text-sm" />
                </FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div
            className={`grid ${form.watch('customer_info') ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} duration-500`}
          >
            <div
              className={`${form.watch('customer_info') ? 'p-space8' : 'overflow-hidden'} overflow-hidden space-y-space12`}
            >
              <FormField
                control={form.control}
                name="customer"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="">
                          <SelectValue placeholder="Customer" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <div className="max-h-[24rem] overflow-y-scroll">
                          <SelectItem value="m@example.com">
                            m@example.com
                          </SelectItem>
                          <SelectItem value="m@google.com">
                            m@google.com
                          </SelectItem>
                          <SelectItem value="m@support.com">
                            m@support.com
                          </SelectItem>
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

              <FormField
                control={form.control}
                name="customer_number"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Number" className="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div>
          <FormField
            control={form.control}
            name="employee_info"
            render={({ field }) => (
              <FormItem className="flex justify-between items-center gap-space8">
                <FormLabel>
                  <Text title="Employee information" className="text-sm" />
                </FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div
            className={`grid ${form.watch('employee_info') ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} duration-500`}
          >
            <div
              className={`${form.watch('employee_info') ? 'p-space8' : 'overflow-hidden'} overflow-hidden space-y-space12`}
            >
              <FormField
                control={form.control}
                name="employee"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="">
                          <SelectValue placeholder="Employee" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <div className="max-h-[24rem] overflow-y-scroll">
                          <SelectItem value="m@example.com">
                            m@example.com
                          </SelectItem>
                          <SelectItem value="m@google.com">
                            m@google.com
                          </SelectItem>
                          <SelectItem value="m@support.com">
                            m@support.com
                          </SelectItem>
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

              <FormField
                control={form.control}
                name="employee_number"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Number" className="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <DrawerFooter height="14rem" className="flex-col !gap-space12">
          <div className="flex items-center gap-space8 justify-center">
            <Switch id="airplane-mode" />
            <Text title="Send SMS" className="text-sm font-medium" />
            <Text
              variant="success"
              className="text-sm font-medium flex items-center gap-space4 bg-success-10 py-space4 px-space12 rounded-full"
            >
              <Icon icon="material-symbols:sms" />
              SMS Balance 27
            </Text>
          </div>

          <Button type="submit" className="w-full">
            Amount Recieved
          </Button>
        </DrawerFooter>
      </form>
    </Form>
  );
};

export default ConfirmPayment;

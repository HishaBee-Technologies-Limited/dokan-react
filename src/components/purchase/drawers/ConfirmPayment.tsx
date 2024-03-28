import { z } from 'zod';
import React, { useEffect, useState } from 'react';
import { SellEnum } from '@/enum/sell';
import { useForm } from 'react-hook-form';
import Icon from '@/components/common/Icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { Switch } from '@/components/ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from '@/components/common/DatePicker';
import { usePurchaseStore } from '@/stores/usePurchase';
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
import { usePurchase } from '@/stores/usePurchaseStore';
import { getAllSupplier } from '@/actions/contacts/getAllSupplier';
import { getCookie } from 'cookies-next';
import { IUserResponse } from '@/types/contact/partyResponse';
import { getAllEmployee } from '@/actions/contacts/getAllEmployee';
import { createPurchase } from '@/actions/purchase/createPurchase';
import { IProductPurchasePayload } from '@/types/purchase';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Calendar } from '@/components/ui/calendar';

const formSchema = z.object({
  amount: z.string().min(1, {
    message: 'this field is required.',
  }),
  note: z.string(),
  details: z.string(),
  images: z.string(),
  cash_type: z.string(),
  supplier_info: z.boolean().default(false).optional(),
  supplier_number: z.string().optional(),
  supplier: z.string(),
  employee_info: z.boolean().default(false).optional(),
  employee_number: z.string().optional(),
  employee: z.string().optional(),
  date: z.date(),
});

const ConfirmPayment = () => {
  const closeDrawer = usePurchaseStore((state) => state.setDrawerState);
  const openSuccessDialog = usePurchaseStore((state) => state.setDialogState);
  const calculatedProducts = usePurchase((state) => state.calculatedProducts);
  const [suppliers, setSuppliers] = useState<IUserResponse[]>();
  const [employees, setEmployee] = useState<IUserResponse[]>();

  console.log('sss', calculatedProducts);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
      details: '',
      note: '',
      images: '',
      cash_type: '',
      supplier_info: true,
      supplier_number: '',
      supplier: '',
      employee_info: true,
      employee_number: '',
      employee: '',
    },
  });

  const selectedSupplier = form.watch('supplier');
  const selectedEmployee = form.watch('employee');
  useEffect(() => {
    if (calculatedProducts) {
      form.setValue('amount', String(calculatedProducts.totalPrice));
    }
  }, [calculatedProducts, form]);
  useEffect(() => {
    if (selectedSupplier) {
      form.setValue('supplier_number', selectedSupplier.split('-')[1]);
    }
    if (selectedEmployee) {
      form.setValue('employee_number', selectedEmployee.split('-')[1]);
    }
  }, [selectedSupplier, form, selectedEmployee]);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    // const purchaseData: IProductPurchasePayload = {
    //   date:
    // }
    // const res = await createPurchase()
    console.log('data------------', data);
    // closeDrawer({ open: false });
    // openSuccessDialog({ open: true, header: SellEnum.SUCCESSFUL });
  }

  useEffect(() => {
    const fetchSuppliersAndEmployees = async () => {
      const shopId = getCookie('shopId');

      const suppliers = await getAllSupplier(Number(shopId));
      const employees = await getAllEmployee(Number(shopId));
      if (suppliers?.success) {
        setSuppliers(suppliers?.data as IUserResponse[]);
      } else {
        console.log(suppliers);
      }
      if (employees?.success) {
        setEmployee(employees?.data as IUserResponse[]);
      } else {
        console.log(employees);
      }
    };
    fetchSuppliersAndEmployees();
  }, []);

  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-space12">
        {/* <DatePicker
          onChange={() => {}}
          contentAlign={'center'}
          triggerClasses={'w-full justify-center'}
        /> */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                    className="bg-white"
                    weekStartsOn={0}
                  />
                </PopoverContent>
              </Popover>

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
                <Input type="number" disabled placeholder="Amount" {...field} />
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
            name="supplier_info"
            render={({ field }) => (
              <FormItem className="flex justify-between items-center gap-space8">
                <FormLabel>
                  <Text title="Supplier information" className="text-sm" />
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
            className={`grid ${
              form.watch('supplier_info')
                ? 'grid-rows-[1fr]'
                : 'grid-rows-[0fr]'
            } duration-500`}
          >
            <div
              className={`${
                form.watch('supplier_info') ? 'p-space8' : 'overflow-hidden'
              } overflow-hidden space-y-space12`}
            >
              <FormField
                control={form.control}
                name="supplier"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="">
                          <SelectValue placeholder="Supplier" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <div className="max-h-[24rem] overflow-y-scroll">
                          {suppliers?.map((supplier) => (
                            <SelectItem
                              key={supplier.unique_id}
                              value={`${supplier.name}-${supplier.mobile}`}
                            >
                              {supplier.name}
                            </SelectItem>
                          ))}
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
                name="supplier_number"
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
            className={`grid ${
              form.watch('employee_info')
                ? 'grid-rows-[1fr]'
                : 'grid-rows-[0fr]'
            } duration-500`}
          >
            <div
              className={`${
                form.watch('employee_info') ? 'p-space8' : 'overflow-hidden'
              } overflow-hidden space-y-space12`}
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
                          {employees?.map((employee) => (
                            <SelectItem
                              key={employee.unique_id}
                              value={`${employee.name}-${employee.mobile}`}
                            >
                              {employee.name}
                            </SelectItem>
                          ))}
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

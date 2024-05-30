import { z } from 'zod';
import React, { useEffect, useMemo, useState } from 'react';
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
import { getCookie } from 'cookies-next';
import { IUserResponse } from '@/types/contact/partyResponse';
import { DEFAULT_STARTING_VERSION } from '@/lib/constants/product';
import {
  DATE_FORMATS,
  PAYMENT_METHODS,
  PAYMENT_STATUS,
  TRANSACTION_TYPE,
} from '@/lib/constants/common';
import { cn, formatDate, generateUlid } from '@/lib/utils';
import { jwtDecode } from 'jwt-decode';
import { createSell } from '@/actions/sell/createSell';
import { sellItemCreate } from '@/actions/sell/sellItemCreate';
import { toast } from 'sonner';
import { getAllCustomer } from '@/actions/contacts/getAllCustomer';
import { getAllEmployee } from '@/actions/contacts/getAllEmployee';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, ReloadIcon } from '@radix-ui/react-icons';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

const formSchema = z.object({
  amount: z.string(),
  note: z.string().optional(),
  details: z.string().optional(),
  images: z.string().optional(),
  cash_type: z.string().optional(),
  customer_info: z.boolean().default(false).optional(),
  customer_number: z.string().optional(),
  customer: z.string(),
  employee_info: z.boolean().default(false).optional(),
  employee_number: z.string().optional(),
  employee: z.string().optional(),
  date: z.date(),
  customer_address: z.string().optional(),
  sms: z.boolean().optional(),
});

const ConfirmPayment = () => {
  const closeDrawer = useSellStore((state) => state.setSellDrawerState);
  const openSuccessDialog = useSellStore((state) => state.setSellDialogState);
  const setCalculatedProducts = useSellStore(
    (state) => state.setCalculatedProducts
  );
  const calculatedProducts = useSellStore((state) => state.calculatedProducts);
  const [customers, setCustomers] = useState<IUserResponse[]>();
  const [employees, setEmployee] = useState<IUserResponse[]>();
  const [loading, setLoading] = useState(false);

  const tkn = getCookie('access_token');
  const cookie = getCookie('shop');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer_info: true,
      customer_number: '',
      customer: '',
      employee_info: false,
      date: new Date(),
      sms: false,
    },
  });

  const selectedSupplier = form.watch('customer');
  const selectedEmployee = form.watch('employee');
  useEffect(() => {
    if (calculatedProducts) {
      form.setValue('amount', String(calculatedProducts.totalPrice));
    }
  }, [calculatedProducts, form]);
  console.log(calculatedProducts);
  useEffect(() => {
    console.log(selectedSupplier.split('-'));
    const supplierNameArray = selectedSupplier.split('-');
    const employeeNameArray = selectedEmployee?.split('-');
    if (selectedSupplier) {
      form.setValue(
        'customer_number',
        supplierNameArray[supplierNameArray.length - 1]
      );
    }
    if (employeeNameArray) {
      form.setValue(
        'employee_number',
        employeeNameArray[employeeNameArray?.length - 1]
      );
    }
  }, [selectedSupplier, form, selectedEmployee]);
  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!data.amount) {
      form.setError('amount', {
        type: 'required',
        message: 'Amount is required',
      });
      return;
    }
    const customerName = data.customer.split('-')[0];
    const employeeName = data.employee?.split('-')[0];

    console.log(customerName, employeeName);

    setLoading(true);
    const responseCreateSell = await createSell({
      created_at: formatDate(DATE_FORMATS.default, data.date),
      discount: Number(calculatedProducts.discount),
      discount_type: calculatedProducts.discountType ?? '',
      employee_mobile: data.employee_number,
      employee_name: employeeName,
      note: data.note,
      payment_method: PAYMENT_METHODS.Cash,
      payment_status: PAYMENT_STATUS.PAID,
      purchase_barcode: '',
      received_amount: Number(data.amount),
      customer_mobile: data.customer_number,
      customer_name: customerName,
      customer_address: data.customer_address,
      total_item: totalItems,
      total_price: Number(data.amount),
      unique_id: generateUlid(),
      updated_at: formatDate(DATE_FORMATS.default),
      user_id: tkn ? Number(jwtDecode(tkn).sub) : 0,
      version: DEFAULT_STARTING_VERSION,
      extra_charge: Number(calculatedProducts.deliveryCharge),
      total_discount: 0,
      transaction_type: TRANSACTION_TYPE.PRODUCT_SELL,
      total_profit: String(totalProfit),
      message: data.sms ? 'SMS' : null,
    });
    console.log('res----', responseCreateSell);

    if (!responseCreateSell?.success)
      return toast.error('Something went wrong');

    if (responseCreateSell?.success) {
      console.log(responseCreateSell);
      calculatedProducts.products.forEach(async (product) => {
        sellItemCreate({
          created_at: formatDate(DATE_FORMATS.default),
          name: product.name,
          quantity: product.calculatedAmount?.quantity,
          unit_price: product.calculatedAmount?.unit_price,
          unit_cost: product.cost_price,
          transaction_unique_id: responseCreateSell.data.transaction.unique_id,
          profit:
            product.calculatedAmount?.quantity! *
            (product.selling_price - product.cost_price),
          status: 'PAID',

          shop_product_id: product.id,
          shop_product_unique_id: product.unique_id,
          shop_product_variance_id: 1,
          price: product.calculatedAmount?.total,
          unique_id: generateUlid(),
          updated_at: formatDate(DATE_FORMATS.default),
          version: DEFAULT_STARTING_VERSION,
        });
      });
      setCalculatedProducts({
        ...calculatedProducts,
        paymentAmount: Number(data.amount),
        date: formatDate(DATE_FORMATS.default, data.date),
      });
      setLoading(false);

      closeDrawer({ open: false });
      openSuccessDialog({ open: true, header: SellEnum.SUCCESSFUL });
    }
    if (responseCreateSell?.error) {
      toast.error('Something went wrong');

      console.log('error-------', responseCreateSell?.error);
    }

    console.log('data------------', data);
    // console.log('res------------', responseCreateSell);
  }

  useEffect(() => {
    const fetchSuppliersAndEmployees = async () => {
      const shopId = getCookie('shopId');

      const customer = await getAllCustomer(Number(shopId));
      const employees = await getAllEmployee(Number(shopId));
      if (customer?.success) {
        setCustomers(customer?.data as IUserResponse[]);
      } else {
        console.log(customer);
      }
      if (employees?.success) {
        setEmployee(employees?.data as IUserResponse[]);
      } else {
        console.log(employees);
      }
    };
    fetchSuppliersAndEmployees();
  }, []);
  const totalProfit = useMemo(
    () =>
      calculatedProducts.products.reduce((prev, current) => {
        return (
          prev +
          current.calculatedAmount?.quantity! *
            (current.selling_price - current.cost_price)
        );
      }, 0),
    [calculatedProducts]
  );

  const totalItems = useMemo(
    () =>
      calculatedProducts.products.reduce((prev, current) => {
        return prev + Number(current.calculatedAmount?.quantity!);
      }, 0),
    [calculatedProducts]
  );
  console.log(totalItems);
  console.log(calculatedProducts);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-space12">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of Sell</FormLabel>
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
                        <span>{format(new Date(), 'PPP')}</span>
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
              {/* <FormLabel>
                Amount <span className="text-error-100">*</span>{' '}
              </FormLabel> */}
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
                      // defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="">
                          <SelectValue placeholder="Customer" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-[500px]">
                        <div className="max-h-[24rem] overflow-y-scroll">
                          {customers?.map((customer, i) => (
                            <SelectItem
                              key={i + 1}
                              value={`${customer.name}-${customer.mobile}`}
                            >
                              {customer.name}
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

              {/* <FormField
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
              /> */}

              <FormField
                control={form.control}
                name="customer_address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Address" className="" {...field} />
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
                          {employees?.map((employee, i) => (
                            <SelectItem
                              key={i + 1}
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
            <FormField
              control={form.control}
              name="sms"
              render={({ field }) => (
                <FormItem>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="airplane-mode"
                  />
                </FormItem>
              )}
            />
            <Text title="Send SMS" className="text-sm font-medium" />
            <Text
              variant="success"
              className="text-sm font-medium flex items-center gap-space4 bg-success-10 py-space4 px-space12 rounded-full"
            >
              <Icon icon="material-symbols:sms" />
              SMS Balance {cookie ? JSON.parse(cookie).sms_count : 0}
            </Text>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Amount Received
          </Button>
        </DrawerFooter>
      </form>
    </Form>
  );
};

export default ConfirmPayment;

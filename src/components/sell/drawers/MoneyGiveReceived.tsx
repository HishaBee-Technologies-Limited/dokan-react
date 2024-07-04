import { z } from 'zod';
import { SellEnum } from '@/enum/sell';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import Icon from '@/components/common/Icon';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { Switch } from '@/components/ui/switch';
import { useSellStore } from '@/stores/useSellStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { DrawerFooter } from '@/components/common/Drawer';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
import { IUserResponse } from '@/types/contact/partyResponse';
import { getCookie } from 'cookies-next';
import { cn, formatDate, generateUlid } from '@/lib/utils';
import {
  DATE_FORMATS,
  PAYMENT_METHODS,
  PAYMENT_STATUS,
} from '@/lib/constants/common';
import { DEFAULT_STARTING_VERSION } from '@/lib/constants/product';
import { sellItemCreate } from '@/actions/sell/sellItemCreate';
import { toast } from 'sonner';
import { createSell } from '@/actions/sell/createSell';
import { jwtDecode } from 'jwt-decode';
import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Check, UserSearch } from 'lucide-react';
import { createDueItem } from '@/actions/due/createDueItem';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';
import { createDue } from '@/actions/due/createDue';
import { IDueListResponse } from '@/types/due/dueResponse';
import { ReloadIcon } from '@radix-ui/react-icons';
import { getUserDue } from '@/actions/due/getUserDue';
import { SELL_SMS } from '@/lib/sms-text';

const partyList = ['customer', 'supplier'];

const cashType = [
  { value: 'given', label: 'Given', dis: 'You give money' },
  { value: 'received', label: 'Received', dis: 'You received money' },
];

const formSchema = z.object({
  amount: z.string().min(1, {
    message: 'this field is required.',
  }),
  name: z.string().min(1, {
    message: 'this field is required.',
  }),
  number: z.string(),
  details: z.string(),
  images: z.string(),
  cash_type: z.string(),
  sms: z.boolean().optional(),
  date: z.date(),
  due: z.any(),

  customer_address: z.string().optional(),
});

const MoneyGiveReceived = ({ customers }: { customers?: IUserResponse[] }) => {
  const handleSellDrawer = useSellStore((state) => state.setSellDrawerState);
  const openSuccessDialog = useSellStore((state) => state.setSellDialogState);

  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState<IUserResponse>();

  const calculatedProducts = useSellStore((state) => state.calculatedProducts);
  const setCalculatedProducts = useSellStore(
    (state) => state.setCalculatedProducts
  );
  const shop = getCookie('shop');
  const tkn = getCookie('access_token');

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
  useEffect(() => {
    console.log(contact);
    if (contact) {
      form.setValue('name', contact.name);
      form.setValue('number', contact.mobile);
    }
  }, [contact]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      amount: '',
      details: '',
      number: '',
      images: '',
      cash_type: 'given',
      sms: false,
      date: new Date(),
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const paymentAmount =
      Number(data.amount) === Number(calculatedProducts.totalPrice)
        ? 0
        : Number(calculatedProducts.totalPrice) - Number(data.amount);

    const sms = data.sms
      ? SELL_SMS({
          amount: String(calculatedProducts.totalPrice)!,
          payment: String(paymentAmount),
          due: String(calculatedProducts.totalPrice! - paymentAmount),
          shopName: JSON.parse(shop!).name,
          shopNumber: JSON.parse(shop!).number,
        })
      : null;

    console.log(data, sms);
    setLoading(true);
    const responseCreateSell = await createSell({
      created_at: formatDate(DATE_FORMATS.default, data.date),
      discount: Number(calculatedProducts.discount),
      discount_type: calculatedProducts.discountType ?? '',
      // employee_mobile: data.employee_number,
      // employee_name: data.employee,
      note: data.details,
      payment_method: PAYMENT_METHODS['Due Payment'],
      payment_status: PAYMENT_STATUS.UNPAID,
      purchase_barcode: '',
      received_amount: Number(data.amount),
      customer_mobile: data.number,
      customer_name: data.name,
      customer_address: data.customer_address,
      total_item: totalItems,
      total_price: Number(data.amount),
      unique_id: generateUlid(),
      updated_at: formatDate(DATE_FORMATS.default),
      user_id: tkn ? Number(jwtDecode(tkn).sub) : 0,
      version: DEFAULT_STARTING_VERSION,
      total_discount: 0,
      transaction_type: 'PRODUCT_SELL',
      total_profit: String(totalProfit),
      extra_charge: Number(calculatedProducts.deliveryCharge),
      message: sms,
    });

    if (responseCreateSell?.success) {
      calculatedProducts.products.forEach(async (product) => {
        sellItemCreate({
          created_at: formatDate(DATE_FORMATS.default, data.date),
          name: product.name,
          quantity: product.calculatedAmount?.quantity,
          unit_price: product.selling_price,
          unit_cost: product.cost_price,

          transaction_unique_id: responseCreateSell?.data.transaction.unique_id,
          profit:
            product.calculatedAmount?.quantity! *
            (product.selling_price - product.cost_price),
          status: PAYMENT_STATUS.UNPAID,
          shop_product_unique_id: product.unique_id,

          shop_product_id: product.id,
          shop_product_variance_id: 1,
          price: product.calculatedAmount?.total,
          unique_id: generateUlid(),
          updated_at: formatDate(DATE_FORMATS.default),
          version: DEFAULT_STARTING_VERSION,
        });
      });
    }
    if (responseCreateSell?.error) {
      toast.error('Something went wrong');
    }
    const shop_id = getCookie('shopId') as string;
    const amount = data.due
      ? Number(data.due.due_amount) + Number(data.amount)
      : Number(data.amount);
    const payload = {
      shop_id: Number(shop_id),
      amount: amount,
      unique_id: data.due ? data.due.unique_id : generateUlid(),
      due_left: amount,
      version: data.due
        ? Number(data.due.version) + 1
        : DEFAULT_STARTING_VERSION,
      updated_at: formatDate(DATE_FORMATS.default),
      created_at: formatDate(DATE_FORMATS.default),
      message: data.details,
      contact_mobile: data.number,
      contact_type: 'CUSTOMER',
      contact_name: data.name,
      // sms: data.sms ?? false,
      transaction_unique_id: responseCreateSell?.data.transaction.unique_id,
    };

    const dueRes = await createDue(payload);
    if (!dueRes?.success) return toast.error('Something went wrong');
    if (dueRes?.success) {
      const payload = {
        amount: Number(calculatedProducts.totalPrice),
        unique_id: generateUlid(),
        due_left: Number(data.amount),
        version: DEFAULT_STARTING_VERSION,
        updated_at: formatDate(DATE_FORMATS.default),
        created_at: formatDate(DATE_FORMATS.default),
        message: data.details,
        contact_mobile: data.number,
        contact_type: 'CUSTOMER',
        contact_name: data.name,
        // sms: data.sms ?? false,
        transaction_unique_id: responseCreateSell?.data.transaction.unique_id,
        due_unique_id: dueRes?.data.due.unique_id,
      };

      const payloadForPaymentAmount = {
        amount: paymentAmount * -1,
        unique_id: generateUlid(),
        due_left: 0,
        version: DEFAULT_STARTING_VERSION,
        updated_at: formatDate(DATE_FORMATS.default),
        created_at: formatDate(DATE_FORMATS.default),
        message: data.details,
        contact_mobile: data.number,
        contact_type: 'CUSTOMER',
        contact_name: data.name,
        // sms: data.sms ?? false,
        transaction_unique_id: null,
        due_unique_id: dueRes?.data.due.unique_id,
      };

      const res = await createDueItem(payload);
      if (Number(data.amount) !== Number(calculatedProducts.totalPrice)) {
        const res = await createDueItem(payloadForPaymentAmount);
      }
      // const resAmount = await createDueItem(payloadForPaymentAmount);
    }
    setCalculatedProducts({
      ...calculatedProducts,
      paymentAmount:
        Number(data.amount) === Number(calculatedProducts.totalPrice)
          ? 0
          : Number(calculatedProducts.totalPrice) - Number(data.amount),
      date: formatDate(DATE_FORMATS.default, data.date),
      user: { name: data.name, mobile: data.number },
    });
    setLoading(false);

    handleSellDrawer({ open: false });
    openSuccessDialog({ open: true, header: SellEnum.SUCCESSFUL });
  }

  const activeCashColor = (active: string): string => {
    if (
      form.watch('cash_type') === 'given' &&
      form.watch('cash_type') === active
    ) {
      return 'border-error-100 dark:border-primary-80';
    } else if (
      form.watch('cash_type') === 'received' &&
      form.watch('cash_type') === active
    ) {
      return 'border-success-100 dark:border-primary-80';
    } else {
      return 'border-color';
    }
  };

  useEffect(() => {
    if (!form.watch('cash_type')) {
      form.setValue('cash_type', 'given');
    }
    if (form.watch('cash_type') === 'given') {
      handleSellDrawer({ open: true, header: SellEnum.MONEY_GIVEN_ENTRY });
    } else {
      handleSellDrawer({ open: true, header: SellEnum.MONEY_RECEIVED_ENTRY });
    }
  }, [form.watch('cash_type')]);

  useEffect(() => {
    form.setValue('amount', String(calculatedProducts.totalPrice));
  }, [calculatedProducts]);

  useEffect(() => {
    const fetchUserDue = async () => {
      const sup_mobile = form.watch('number');

      const res = await getUserDue(sup_mobile);
      console.log(res);
      if (res?.success) {
        form.setValue('due', res.data);
      }
      /*@ts-ignore*/
      if (!res?.success && res?.error?.status === 404) {
        console.log('no due');
      }
    };
    fetchUserDue();
  }, [form.watch('number')]);
  const totalItems = useMemo(
    () =>
      calculatedProducts.products.reduce((prev, current) => {
        return prev + Number(current.calculatedAmount?.quantity!);
      }, 0),
    [calculatedProducts]
  );

  return (
    <div className="space-y-space12">
      <Tabs onChange={(value) => {}} defaultValue={partyList[0]}>
        <div className="border-b border-color pb-space16">
          <TabsList className="grid grid-cols-2">
            {partyList.map((tab) => (
              <TabsTrigger key={tab} value={tab} className="uppercase">
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>

      <Text
        title={`Payable Amount  ৳ ${calculatedProducts.totalPrice}`}
        className="text-lg font-medium bg-primary-10 dark:bg-primary-80 text-center rounded-md py-space8"
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-space12"
        >
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
            name="cash_type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Cash</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-space8"
                  >
                    {cashType.map((item) => (
                      <FormItem
                        key={item.value}
                        className={`flex rounded-md border-2 py-space8 px-space12 gap-space8 w-full ${activeCashColor(item.value)}`}
                      >
                        <FormControl>
                          <RadioGroupItem
                            disabled={item.value !== 'given'}
                            value={item.value}
                          />
                        </FormControl>
                        <FormLabel className="font-normal w-full space-y-space8">
                          <Text title={item.label} className="font-medium" />
                          <Text title={item.dis} variant="secondary" />
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
            name="name"
            render={({ field }) => (
              <FormItem className="pb-8">
                <FormLabel>
                  Customer Name <span className="text-error-100">*</span>{' '}
                </FormLabel>
                <FormControl>
                  <div className="relative h-10 w-full">
                    <Input
                      type="text"
                      placeholder="Enter name..."
                      className="pl-3 pr-20 text-md w-full border border-gray-300  shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6E23DD] focus:border-transparent" // Add additional styling as needed
                      {...field}
                    />

                    <FormItem className="flex flex-col absolute right-2 top-8 transform -translate-y-1/2 text-gray-500 z-10">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="transparent"
                              role="combobox"
                              className={cn(
                                'w-[50px] justify-between',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                              <UserSearch className="  shrink-0" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0 border border-gray-300 mr-10 ">
                          <Command>
                            <CommandInput
                              placeholder="Search language..."
                              className="w-[w-200px]"
                            />
                            <CommandEmpty>No language found.</CommandEmpty>
                            <CommandGroup className="">
                              <ScrollArea className="h-[200px] scroll-p-4 rounded-md border">
                                {customers?.map((customer) => (
                                  <CommandItem
                                    value={contact?.name}
                                    key={customer.id}
                                    onSelect={() => {
                                      setContact(customer);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        customer.name === contact?.name
                                          ? 'opacity-100'
                                          : 'opacity-0'
                                      )}
                                    />
                                    <div className="flex flex-col">
                                      <p>{customer.name}</p>
                                      <p>{customer.mobile}</p>
                                    </div>
                                    {/* {supplier.mobile} */}
                                  </CommandItem>
                                ))}
                              </ScrollArea>
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Customer Number <span className="text-error-100">*</span>{' '}
                </FormLabel>
                <FormControl>
                  <Input placeholder="Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="customer_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
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
                    <Input placeholder="Note" {...field} />
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
                      id="sms"
                    />
                  </FormItem>
                )}
              />
              <Text title="Send SMS" className="text-sm font-medium" />
              <Text
                variant="success"
                className="text-sm font-medium flex items-center gap-space4 bg-success-10 dark:bg-primary-80 py-space4 px-space12 rounded-full"
              >
                <Icon icon="material-symbols:sms" />
                SMS Balance {shop ? JSON.parse(shop).sms_count : 0}
              </Text>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              Sell
            </Button>
          </DrawerFooter>
        </form>
      </Form>
    </div>
  );
};

export default MoneyGiveReceived;

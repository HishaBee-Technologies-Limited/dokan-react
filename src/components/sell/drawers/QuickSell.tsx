import { z } from 'zod';
import React, { useEffect, useState } from 'react';
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
import { IUserResponse } from '@/types/contact/partyResponse';
import { createSell } from '@/actions/sell/createSell';
import {
  DATE_FORMATS,
  PAYMENT_METHODS,
  PAYMENT_STATUS,
} from '@/lib/constants/common';
import { cn, formatDate, generateUlid } from '@/lib/utils';
import { DEFAULT_STARTING_VERSION } from '@/lib/constants/product';
import { jwtDecode } from 'jwt-decode';
import { getCookie } from 'cookies-next';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, ReloadIcon } from '@radix-ui/react-icons';
import { Calendar } from '@/components/ui/calendar';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check, UserSearch } from 'lucide-react';
import { toast } from 'sonner';
import { addQuickSell } from '@/actions/sell/addQuickSell';
import { IDueListResponse } from '@/types/due/dueResponse';
import { Switch } from '@/components/ui/switch';
import { QUICK_SELL_SMS } from '@/lib/sms-text';
const shop = getCookie('shop');

const cashType = [
  { value: 'cash', label: 'নগদ টাকা' },
  // { value: 'due', label: 'বাকি' },
  // { value: 'bank', label: 'বিকাশ / নগদ ' },
];

const formSchema = z.object({
  customer: z.string(),
  amount: z.string().min(1, {
    message: 'this field is required.',
  }),
  number: z.string(),
  details: z.string(),
  images: z.string(),
  cash_type: z.string(),
  date: z.date().optional(),
  due: z.any(),
  profit: z.string(),
  sms: z.boolean().optional(),
});

const QuickSell = ({
  customers,
  dueList,
}: {
  customers?: IUserResponse[];
  dueList?: IDueListResponse[];
}) => {
  const closeDrawer = useSellStore((state) => state.setSellDrawerState);
  const openSuccessDialog = useSellStore((state) => state.setSellDialogState);
  const tkn = getCookie('access_token');
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState<IUserResponse>();
  const setCalculatedProducts = useSellStore(
    (state) => state.setCalculatedProducts
  );
  const calculatedProducts = useSellStore((state) => state.calculatedProducts);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer: '',
      amount: '',
      details: '',
      number: '',
      images: '',
      cash_type: 'cash',
      profit: '',
      sms: false,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);
    const sms = data.sms
      ? QUICK_SELL_SMS({
          amount: data.amount,
          payment: data.amount,
          due: '0',
          shopName: JSON.parse(shop!).name,
          shopNumber: JSON.parse(shop!).number,
        })
      : null;

    console.log(data, sms);
    const responseCreateSell = await createSell({
      created_at: formatDate(DATE_FORMATS.default, data.date),
      // discount: Number(calculatedProducts.discount),
      // discount_type: calculatedProducts.discountType ?? '',
      // employee_mobile: data.employee_number,
      // employee_name: data.employee,
      note: data.details,
      payment_method: PAYMENT_METHODS['Cash'],
      payment_status: PAYMENT_STATUS.PAID,
      purchase_barcode: '',
      received_amount: Number(data.amount),
      customer_mobile: data.number,
      customer_name: data.customer,
      total_price: Number(data.amount),
      unique_id: generateUlid(),
      updated_at: formatDate(DATE_FORMATS.default),
      user_id: tkn ? Number(jwtDecode(tkn).sub) : 0,
      version: DEFAULT_STARTING_VERSION,
      total_discount: 0,
      transaction_type: 'QUICK_SELL',
      total_profit: data.profit,
      total_item: 1,
      message: sms,
    });

    if (responseCreateSell?.success) {
      addQuickSell({
        created_at: formatDate(DATE_FORMATS.default),

        transaction_unique_id: responseCreateSell?.data.transaction.unique_id,
        status: 'PAID',

        price: data.amount,
        unique_id: generateUlid(),
        updated_at: formatDate(DATE_FORMATS.default),
        version: DEFAULT_STARTING_VERSION,
      });

      // closeDrawer({ open: false });
      // openSuccessDialog({ open: true, header: SellEnum.SUCCESSFUL });
    }
    if (responseCreateSell?.error) {
      toast.error('Something went wrong');
    }
    // if (data.cash_type === 'due') {
    //   const shop_id = getCookie('shopId') as string;
    //   console.log('shopId----', shop_id);
    //   const amount = data.due
    //     ? Number(data.due.due_amount) - Number(data.amount)
    //     : -Number(data.amount);
    //   const payload = {
    //     shop_id: Number(shop_id),
    //     amount: amount,
    //     unique_id: data.due ? data.due.unique_id : generateUlid(),
    //     due_left: amount,
    //     version: data.due
    //       ? Number(data.due.version) + 1
    //       : DEFAULT_STARTING_VERSION,
    //     updated_at: formatDate(DATE_FORMATS.default),
    //     created_at: formatDate(DATE_FORMATS.default),
    //     message: data.details,
    //     contact_mobile: data.number,
    //     contact_type: 'CUSTOMER',
    //     contact_name: data.customer,
    //     // sms: data.sms ?? false,
    //     transaction_unique_id: responseCreateSell?.data.transaction.unique_id,
    //   };

    //   const dueRes = await createDue(payload);
    //   console.log('dueRes----', dueRes);

    //   if (!dueRes?.success) {
    //     console.log(dueRes?.error);
    //     toast.error('Something went wrong');
    //   }

    //   if (dueRes?.success) {
    //     const payload = {
    //       amount: -Number(data.amount),
    //       unique_id: generateUlid(),
    //       due_left: -Number(data.amount),
    //       version: DEFAULT_STARTING_VERSION,
    //       updated_at: formatDate(DATE_FORMATS.default),
    //       created_at: formatDate(DATE_FORMATS.default),
    //       message: data.details,
    //       contact_mobile: data.number,
    //       contact_type: 'CUSTOMER',
    //       contact_name: data.customer,
    //       // sms: data.sms ?? false,
    //       transaction_unique_id: responseCreateSell?.data.transaction.unique_id,
    //       due_unique_id: dueRes?.data.due.unique_id,
    //     };

    //     console.log('---', payload);

    //     const res = await createDueItem(payload);

    //     console.log('res----', res);
    //   }
    // }
    // setCalculatedProducts({
    //   ...calculatedProducts,
    //   paymentAmount: -Number(data.amount),
    //   date: formatDate(DATE_FORMATS.default, data.date),
    // });
    setLoading(false);
    closeDrawer({ open: false });
    toast.success('Quick Sell Added SuccessFully');
    // openSuccessDialog({ open: true, header: SellEnum.SUCCESSFUL });
  }

  useEffect(() => {
    if (contact) {
      form.setValue('customer', contact.name);
      form.setValue('number', contact.mobile);
    }
  }, [contact]);

  useEffect(() => {
    const cus_mobile = form.watch('number');
    const due = dueList?.find((due) => due.contact_mobile === cus_mobile);
    due ? form.setValue('due', due) : due;
  }, [dueList, form.watch('number')]);

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
              <FormLabel>Profit</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Profit" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customer"
          render={({ field }) => (
            <FormItem className="pb-8">
              <FormLabel>
                Customer Name <span className="text-error-100">*</span>{' '}
              </FormLabel>
              <FormControl>
                <div className="relative h-10 w-full">
                  <Input
                    type="text"
                    placeholder=" Enter your name here"
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
                      <PopoverContent className="w-[200px] p-0 mr-10 ">
                        <Command>
                          <CommandInput placeholder="Search language..." />
                          <CommandEmpty>No language found.</CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="h-[300px] scroll-p-4 rounded-md border">
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
                Mobile Number <span className="text-error-100">*</span>{' '}
              </FormLabel>
              <FormControl>
                <Input placeholder="Number" {...field} />
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
              className="text-sm font-medium flex items-center gap-space4 bg-success-10 dark:bg-primary-80 py-space4 px-space12 rounded-full"
            >
              <Icon icon="material-symbols:sms" />
              SMS Balance {shop ? JSON.parse(shop).sms_count : 0}
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

export default QuickSell;

import { string, z } from 'zod';
import { SellEnum } from '@/enum/sell';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import Icon from '@/components/common/Icon';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { Switch } from '@/components/ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePurchaseStore } from '@/stores/usePurchase';
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
  FormDescription,
} from '@/components/ui/form';
import { PurchaseEnum } from '@/enum/purchase';
import { IUserResponse } from '@/types/contact/partyResponse';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn, formatDate, generateUlid } from '@/lib/utils';
import { CalendarIcon, Check, UserSearch } from 'lucide-react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { ulid } from 'ulid';
import { getCookie, getCookies } from 'cookies-next';
import { IShopResponse } from '@/types/shop';
import { DEFAULT_STARTING_VERSION } from '@/lib/constants/product';
import { DATE_FORMATS, PAYMENT_METHODS } from '@/lib/constants/common';
import { usePurchase } from '@/stores/usePurchaseStore';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { PAYMENT_STATUS } from '@/lib/constants/purchase';
import { createPurchase } from '@/actions/purchase/createPurchase';
import { useSession } from 'next-auth/react';
import { jwtDecode } from 'jwt-decode';
import { createDueItem } from '@/actions/due/createDueItem';
import { toast } from 'sonner';
import { createItemPurchase } from '@/actions/purchase/createItemPurchase';
import { createDue } from '@/actions/due/createDue';
import { IDueListResponse } from '@/types/due/dueResponse';
import { ReloadIcon } from '@radix-ui/react-icons';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';

const partyList = ['customer', 'supplier'];

const cashType = [
  { value: 'given', label: 'Given', dis: 'You give money' },
  { value: 'received', label: 'Received', dis: 'You received money/product' },
];

const formSchema = z.object({
  amount: z.string().min(1, {
    message: 'this field is required.',
  }),
  name: z.string().min(1, {
    message: 'this field is required.',
  }),
  number: z.string().min(11).max(11, {
    message: 'this field is required.',
  }),
  details: z.string(),
  images: z.string(),
  cash_type: z.string(),
  contact: z.any(),
  sms: z.boolean().optional(),
  date: z.date(),
  due: z.any(),
});

const MoneyGiveReceived = ({
  suppliers,
  dueList,
}: {
  suppliers?: IUserResponse[];
  dueList: IDueListResponse[];
}) => {
  const handleSellDrawer = usePurchaseStore((state) => state.setDrawerState);
  const openSuccessDialog = usePurchaseStore((state) => state.setDialogState);
  const [contact, setContact] = useState<IUserResponse>();
  const calculatedProducts = usePurchase((state) => state.calculatedProducts);
  const setCalculatedProducts = usePurchase(
    (state) => state.setCalculatedProducts
  );
  const cookie = getCookie('shop');
  const tkn = getCookie('access_token');
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      amount: '',
      details: '',
      number: '',
      images: '',
      cash_type: 'received',
      contact: {},
      sms: false,
      date: new Date(),
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);
    // const employeeName = data.employee?.split('-')[0];
    const responseCreatePurchase = await createPurchase({
      batch: '',
      created_at: formatDate(DATE_FORMATS.default, data.date),
      date: formatDate(DATE_FORMATS.default, data.date),
      discount: Number(calculatedProducts.discount),
      discount_type: calculatedProducts.discountType ?? '',
      extra_charge: Number(calculatedProducts.deliveryCharge),
      note: data.details,
      payment_method: PAYMENT_METHODS['Due Payment'],
      payment_status: PAYMENT_STATUS.unpaid,
      purchase_barcode: '',
      received_amount: Number(data.amount),
      supplier_mobile: data.number,
      supplier_name: data.number,
      total_item: totalItems,
      total_price: Number(data.amount),
      unique_id: generateUlid(),
      updated_at: formatDate(DATE_FORMATS.default),
      user_id: tkn ? Number(jwtDecode(tkn).sub) : 0,
      version: DEFAULT_STARTING_VERSION,
      sms: data.sms ? 'sms' : null,
    });
    if (responseCreatePurchase?.success) {
      calculatedProducts.products.forEach(async (product) => {
        createItemPurchase({
          created_at: formatDate(DATE_FORMATS.default, data.date),
          name: product.name,
          quantity: product.calculatedAmount?.quantity,
          unit_price: product.selling_price,
          unit_cost: product.cost_price,
          purchase_id: responseCreatePurchase.data.purchase.id,

          purchase_unique_id: responseCreatePurchase.data.purchase.unique_id,
          shop_product_unique_id: product.unique_id,

          shop_product_id: product.id,
          shop_product_variance_id: 1,
          price: product.calculatedAmount?.total,
          unique_id: generateUlid(),
          updated_at: formatDate(DATE_FORMATS.default),
          version: DEFAULT_STARTING_VERSION,
        });
      });

      const amount = data.due
        ? Number(data.due.due_amount) - Number(data.amount)
        : -Number(data.amount);

      const payload = {
        // shop_id: Number(shop_id),
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
        contact_type: 'SUPPLIER',
        contact_name: data.name,
        sms: data.sms ?? false,
        purchase_unique_id: responseCreatePurchase.data.purchase.unique_id,
      };

      const dueRes = await createDue(payload);

      const payloadForDueItem = {
        amount: -Number(data.amount),
        unique_id: generateUlid(),
        due_left: -Number(data.amount),
        version: DEFAULT_STARTING_VERSION,
        updated_at: formatDate(DATE_FORMATS.default),
        created_at: formatDate(DATE_FORMATS.default),
        message: data.details,
        contact_mobile: data.number,
        contact_type: 'SUPPLIER',
        contact_name: data.name,
        sms: data.sms ?? false,
        due_unique_id: dueRes?.data.due.unique_id,
        purchase_unique_id: responseCreatePurchase.data.purchase.unique_id,
      };
      const paymentAmount =
        Number(data.amount) === Number(calculatedProducts.totalPrice)
          ? 0
          : Number(calculatedProducts.totalPrice) - Number(data.amount);

      const payloadForDueItemForPayment = {
        amount: -paymentAmount * -1,
        unique_id: generateUlid(),
        due_left: 0,
        version: DEFAULT_STARTING_VERSION,
        updated_at: formatDate(DATE_FORMATS.default),
        created_at: formatDate(DATE_FORMATS.default),
        message: data.details,
        contact_mobile: data.number,
        contact_type: 'SUPPLIER',
        contact_name: data.name,
        sms: data.sms ?? false,
        due_unique_id: dueRes?.data.due.unique_id,
        purchase_unique_id: null,
      };

      const res = await createDueItem(payloadForDueItem);
      const resAmount = await createDueItem(payloadForDueItemForPayment);

      setCalculatedProducts({
        ...calculatedProducts,
        paymentAmount:
          Number(data.amount) === Number(calculatedProducts.totalPrice)
            ? 0
            : Number(calculatedProducts.totalPrice) - Number(data.amount),
        date: formatDate(DATE_FORMATS.default, data.date),
      });
      handleSellDrawer({ open: false });
      openSuccessDialog({ open: true, header: PurchaseEnum.SUCCESSFUL });
    }
    if (responseCreatePurchase?.error) {
      toast.error('Something went wrong');
    }
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
      handleSellDrawer({ open: true, header: PurchaseEnum.MONEY_GIVEN_ENTRY });
    } else {
      handleSellDrawer({
        open: true,
        header: PurchaseEnum.MONEY_RECEIVED_ENTRY,
      });
    }
  }, [form.watch('cash_type')]);

  useEffect(() => {
    if (contact) {
      form.setValue('name', contact.name);
      form.setValue('number', contact.mobile);
    }
  }, [contact, form]);
  const watchNumber = form.watch('number');

  useEffect(() => {
    if (dueList?.length) {
      const sup_mobile = form.watch('number');
      const due = dueList.find((due) => {
        return due.contact_mobile === sup_mobile;
      });
      // console.log(sup_mobile, dueList);
      due ? form.setValue('due', due) : due;
    }
  }, [watchNumber, dueList, form]);

  useEffect(() => {
    form.setValue('amount', String(calculatedProducts.totalPrice));
  }, [calculatedProducts]);

  const totalItems = useMemo(
    () =>
      calculatedProducts.products.reduce((prev, current) => {
        return prev + Number(current.calculatedAmount?.quantity!);
      }, 0),
    [calculatedProducts]
  );

  return (
    <div className="space-y-space12">
      <Tabs onChange={(value) => {}} defaultValue={partyList[1]}>
        <div className="border-b border-color pb-space16">
          <TabsList defaultValue={'supplier'} className="grid grid-cols-2">
            {partyList.map((tab) => (
              <TabsTrigger
                key={tab}
                disabled={tab !== 'supplier'}
                value={tab}
                className="uppercase"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>

      <Text
        title={`Paya'ble Amount  ৳ ${calculatedProducts.totalPrice}`}
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
                <FormLabel>Date of Purchase</FormLabel>
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
                            disabled={item.value === 'given'}
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
                  Name <span className="text-error-100">*</span>{' '}
                </FormLabel>
                <FormControl>
                  <div className="relative h-10 w-full">
                    <Input
                      type="text"
                      placeholder=" Enter your comment here"
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
                            {/* <CommandInput placeholder="Search language..." /> */}
                            <CommandEmpty>No language found.</CommandEmpty>
                            <CommandGroup className="max-h-80 overflow-y-scroll">
                              {/* <ScrollArea className="h-[200px] scroll-p-4 rounded-md border"> */}
                              {suppliers?.map((supplier) => (
                                <CommandItem
                                  value={contact?.name}
                                  key={supplier.id}
                                  onSelect={() => {
                                    setContact(supplier);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      supplier.name === contact?.name
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                  <div className="flex flex-col">
                                    <p>{supplier.name}</p>
                                    <p>{supplier.mobile}</p>
                                  </div>
                                  {/* {supplier.mobile} */}
                                </CommandItem>
                              ))}
                              {/* </ScrollArea> */}
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
                  Number <span className="text-error-100">*</span>{' '}
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
                SMS Balance {cookie ? JSON.parse(cookie).sms_count : 0}
              </Text>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </DrawerFooter>
        </form>
      </Form>
    </div>
  );
};

export default MoneyGiveReceived;

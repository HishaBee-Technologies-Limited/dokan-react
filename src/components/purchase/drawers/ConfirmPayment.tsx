import { z } from 'zod';
import React, { useEffect, useMemo, useState } from 'react';
import { SellEnum } from '@/enum/sell';
import { useForm, useFormContext } from 'react-hook-form';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { cn, formatDate, generateUlid } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, ReloadIcon } from '@radix-ui/react-icons';
import { Calendar } from '@/components/ui/calendar';
import {
  DATE_FORMATS,
  PAYMENT_METHODS,
  PAYMENT_STATUS,
} from '@/lib/constants/common';
import { DEFAULT_STARTING_VERSION } from '@/lib/constants/product';
import { createItemPurchase } from '@/actions/purchase/createItemPurchase';
import { toast } from 'sonner';
import { PurchaseEnum } from '@/enum/purchase';
import { jwtDecode } from 'jwt-decode';
// import { logger } from '../../../../Pino';
import { PURCHASE_SMS } from '@/lib/sms-text';
import { Check, UserSearch } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getUserDue } from '@/actions/due/getUserDue';
import { Skeleton } from '@/components/ui/skeleton';
import { DotLoader, GridLoader, PacmanLoader } from 'react-spinners';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

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
  sms: z.boolean().optional(),
});

const ConfirmPayment = () => {
  const closeDrawer = usePurchaseStore((state) => state.setDrawerState);
  const openSuccessDialog = usePurchaseStore((state) => state.setDialogState);
  const calculatedProducts = usePurchase((state) => state.calculatedProducts);
  const [suppliers, setSuppliers] = useState<IUserResponse[]>();
  const [employees, setEmployee] = useState<IUserResponse[]>();
  const [loading, setLoading] = useState(false);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [contact, setContact] = useState<IUserResponse>();

  const tkn = getCookie('access_token');
  const setCalculatedProducts = usePurchase(
    (state) => state.setCalculatedProducts
  );
  const shop = getCookie('shop');

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
      date: new Date(),
      sms: false,
    },
  });

  useEffect(() => {
    if (calculatedProducts) {
      form.setValue('amount', String(calculatedProducts.totalPrice));
    }
  }, [calculatedProducts, form]);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);

    const sms = data.sms
      ? PURCHASE_SMS({
          amount: data.amount,
          payment: data.amount,
          due: '0',
          shopName: JSON.parse(shop!).name,
          shopNumber: JSON.parse(shop!).number,
        })
      : null;

    const uniqueId = generateUlid();

    const responseCreatePurchase = await createPurchase({
      batch: '',
      created_at: formatDate(DATE_FORMATS.default, data.date),
      date: formatDate(DATE_FORMATS.default, data.date),
      discount: calculatedProducts.discount
        ? Number(calculatedProducts.discount)
        : 0,
      discount_type: calculatedProducts.discountType ?? '',
      employee_mobile: data.employee_number,
      employee_name: data.employee,
      extra_charge: calculatedProducts.deliveryCharge
        ? Number(calculatedProducts.deliveryCharge)
        : 0,
      note: data.note,
      payment_method: PAYMENT_METHODS.Cash,
      payment_status: PAYMENT_STATUS.PAID,
      purchase_barcode: uniqueId,
      received_amount: Number(data.amount),
      supplier_mobile: data.supplier_number,
      supplier_name: data.supplier,
      total_item: totalItems,
      total_price: Number(data.amount),
      unique_id: uniqueId,
      updated_at: formatDate(DATE_FORMATS.default),
      user_id: tkn ? Number(jwtDecode(tkn).sub) : 0,
      version: DEFAULT_STARTING_VERSION,
      sms: sms,
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
      setCalculatedProducts({
        ...calculatedProducts,
        paymentAmount: Number(data.amount),
        date: formatDate(DATE_FORMATS.default, data.date),
        user: { name: data.supplier, mobile: data.supplier_number! },
      });
      closeDrawer({ open: false });
      openSuccessDialog({ open: true, header: PurchaseEnum.SUCCESSFUL });
    }
    if (responseCreatePurchase?.error) {
      toast.error('Something went wrong');
    }
  }
  useEffect(() => {
    if (contact) {
      form.setValue('supplier', contact.name);
      form.setValue('supplier_number', contact.mobile);
    }
  }, [contact]);
  const totalItems = useMemo(
    () =>
      calculatedProducts.products.reduce((prev, current) => {
        return prev + Number(current.calculatedAmount?.quantity!);
      }, 0),
    [calculatedProducts]
  );

  // logger.info('Total items', shop);

  useEffect(() => {
    const fetchSuppliersAndEmployees = async () => {
      setLoadingContacts(true);
      const shopId = getCookie('shopId');

      const suppliers = await getAllSupplier(Number(shopId));
      const employees = await getAllEmployee(Number(shopId));
      if (suppliers?.success) {
        setSuppliers(suppliers?.data as IUserResponse[]);
        setLoadingContacts(false);
      } else {
        setLoadingContacts(false);
      }
      if (employees?.success) {
        setEmployee(employees?.data as IUserResponse[]);
      } else {
        console.log(employees);
      }
    };
    fetchSuppliersAndEmployees();
  }, []);

  // useEffect(() => {
  //   const fetchDue = async () => {
  //     const res = await getUserDue();
  //   };
  // }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-space12">
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

        {/* <FormField
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
          /> */}

        {/* <div
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
            > */}
        <FormField
          control={form.control}
          name="supplier"
          render={({ field }) => (
            <FormItem className="pb-8">
              <FormLabel>
                Supplier Name <span className="text-error-100">*</span>{' '}
              </FormLabel>
              <FormControl>
                <div className="relative h-10 w-full mr-8">
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
                      <PopoverContent className="w-[300px] p-0 border border-gray-300 mr-10">
                        <Command>
                          <CommandInput
                            placeholder="Search language..."
                            className="w-[w-200px]"
                          />
                          {!loadingContacts && (
                            <CommandEmpty>No contacts found.</CommandEmpty>
                          )}
                          <CommandGroup className=" ">
                            <ScrollArea className="h-[200px] max-h-[200px] scroll-p-4  border">
                              {!loadingContacts ? (
                                suppliers?.map((supplier) => (
                                  <CommandItem
                                    value={supplier?.name}
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
                                ))
                              ) : (
                                <div className="flex justify-center mt-2 flex-col gap-2 items-center">
                                  <Skeleton className="w-[280px] h-[50px]" />
                                  <Skeleton className="w-[280px] h-[50px]" />
                                  <Skeleton className="w-[280px] h-[50px]" />
                                </div>
                              )}
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
          name="supplier_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Mobile Number <span className="text-error-100">*</span>{' '}
              </FormLabel>
              <FormControl>
                <Input placeholder="Mobile Number" className="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* </div>
          </div>
        </div> */}

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
              SMS Balance {shop ? JSON.parse(shop).sms_count : 0}
            </Text>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Amount Received
          </Button>
        </DrawerFooter>
      </form>

      <AlertDialog open={true}>
        {/* <AlertDialogTrigger asChild>
          <Button variant="outline">Show Dialog</Button>
        </AlertDialogTrigger> */}
        <AlertDialogContent>
          {/* <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter> */}
          {/* <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-500 border-t-transparent dark:border-gray-400" /> */}
          <DotLoader color="#FFC600" />
          {/* <PacmanLoader color="#FFC600" /> */}
        </AlertDialogContent>
      </AlertDialog>
    </Form>
  );
};

export default ConfirmPayment;

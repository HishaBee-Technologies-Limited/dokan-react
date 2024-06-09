import { z } from 'zod';
import { DueEnum } from '@/enum/due';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Icon from '@/components/common/Icon';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { Switch } from '@/components/ui/switch';
import { useDueStore } from '@/stores/useDueStore';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from '@/components/common/DatePicker';
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
import { IDueListResponse } from '@/types/due/dueResponse';
import { getAllDue } from '@/actions/due/getAllDue';
import { getAllCustomer } from '@/actions/contacts/getAllCustomer';
import { getCookie } from 'cookies-next';
import { getAllSupplier } from '@/actions/contacts/getAllSupplier';
import { IUserResponse } from '@/types/contact/partyResponse';
import { DEFAULT_STARTING_VERSION } from '@/lib/constants/product';
import { cn, formatDate, generateUlid } from '@/lib/utils';
import { DATE_FORMATS } from '@/lib/constants/common';
import { createDueItem } from '@/actions/due/createDueItem';
import { createDue } from '@/actions/due/createDue';
import { useRouter } from 'next/navigation';
import { getAllEmployee } from '@/actions/contacts/getAllEmployee';
import { getUserDue } from '@/actions/due/getUserDue';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, UserSearch } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import { DUE_RECEIVED } from '@/lib/sms-text';

const partyList = ['customer', 'supplier', 'employee'];

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
  number: z.string().min(11).max(11, {
    message: 'this field is required.',
  }),
  details: z.string(),
  images: z.string(),
  cash_type: z.string(),
  contactType: z.string(),
  due: z.any(),
  selectedContact: z.any(),
  sms: z.boolean().optional(),
});

const AddMoneyGiveReceived = (
  {
    //   dueList,
    // }: {
    //   dueList: {
    //     dueList: {
    //       supplierDueList: IDueListResponse[];
    //       customerDueList: IDueListResponse[];
    //       employeeDueList: IDueListResponse[];
    //     };
    //   };
  }
) => {
  const handleDrawerOpen = useDueStore((state) => state.setDrawerState);
  const [contactType, setContactType] = useState('CUSTOMER');
  // const [dueList, setDueList] = useState<IDueListResponse[] | undefined>();
  // const [customer, setContactType] = useState('CUSTOMER');
  const [suppliers, setSuppliers] = useState<IUserResponse[] | undefined>();
  const [customers, setCustomers] = useState<IUserResponse[] | undefined>();
  const [employees, setEmployee] = useState<IUserResponse[] | undefined>();
  const [contacts, setContacts] = useState<IUserResponse[] | undefined>();
  const [contact, setContact] = useState<IUserResponse>();
  const shop = getCookie('shop');

  const [selectedContact, setSelectedContact] = useState<
    IUserResponse[] | undefined
  >();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      amount: '',
      details: '',
      number: '',
      images: '',
      cash_type: '',
      contactType: 'CUSTOMER',
      sms: false,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const amountPos = data.due
      ? Number(data.due.due_amount) + Number(Number(data.amount))
      : Number(data.amount);
    const amountNeg = data.due
      ? Number(data.due.due_amount) - Number(data.amount)
      : -Number(data.amount);

    const amount = data.cash_type === 'given' ? amountPos : amountNeg;

    const sms = data.sms
      ? DUE_RECEIVED({
          amount: data.amount,
          totalDue: data.due,
          shopName: JSON.parse(shop!).name,
          shopNumber: JSON.parse(shop!).number,
        })
      : null;
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
      contact_type: contactType,
      contact_name: data.name,
      sms: data.sms,
      // purchase_unique_id: responseCreatePurchase.data.purchase.unique_id,
    };
    const dueRes = await createDue(payload);
    const payloadForDueItem = {
      amount:
        data.cash_type === 'given' ? -Number(data.amount) : Number(data.amount),
      unique_id: generateUlid(),
      due_left: Number(data.amount),
      version: DEFAULT_STARTING_VERSION,
      updated_at: formatDate(DATE_FORMATS.default),
      created_at: formatDate(DATE_FORMATS.default),
      message: data.details,
      contact_mobile: data.number,
      contact_type: contactType,
      contact_name: data.name,
      // sms: data.sms ?? false,
      due_unique_id: dueRes?.data.due.unique_id,
      // purchase_unique_id: responseCreatePurchase.data.purchase.unique_id,
    };

    const res = await createDueItem(payloadForDueItem);
    router.refresh();

    handleDrawerOpen({ open: false });
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

  // useEffect(() => {
  //   if (!form.watch('cash_type')) {
  //     form.setValue('cash_type', 'given');
  //   }
  //   if (form.watch('cash_type') === 'given') {
  //     handleDrawerOpen({ open: true, header: DueEnum.ADD_MONEY_GIVEN_ENTRY });
  //   } else {
  //     handleDrawerOpen({
  //       open: true,
  //       header: DueEnum.ADD_MONEY_RECEIVED_ENTRY,
  //     });
  //   }
  // }, [form.watch('cash_type')]);

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
    // const sup_mobile = form.watch('number');

    // const dueCustomer = dueList.dueList.customerDueList?.find(
    //   (due) => due.contact_mobile === sup_mobile
    // );
    // const dueSupplier = dueList.dueList.supplierDueList?.find(
    //   (due) => due.contact_mobile === sup_mobile
    // );

    // const dueEmployee = dueList.dueList.employeeDueList?.find(
    //   (due) => due.contact_mobile === sup_mobile
    // );

    // const due =
    //   contactType === 'CUSTOMER'
    //     ? dueCustomer
    //     : contactType === 'SUPPLIER'
    //       ? dueSupplier
    //       : dueEmployee;
    // due ? form.setValue('due', due) : due;
  }, [form.watch('number'), contactType]);

  useEffect(() => {
    const fetchShops = async () => {
      const shopId = getCookie('shopId') ?? '';
      const customer = await getAllCustomer(Number(shopId));
      setCustomers(customer?.data);
      setContacts(customer?.data);
      const supplier = await getAllSupplier(Number(shopId));
      setSuppliers(supplier?.data);
      const employee = await getAllEmployee(Number(shopId));

      setEmployee(employee?.data);
    };
    fetchShops();
  }, []);

  useEffect(() => {
    if (contact) {
      form.setValue('name', contact?.name);
      form.setValue('number', contact?.mobile);
    }
  }, [contact]);

  useEffect(() => {
    if (contactType === 'CUSTOMER') {
      setContacts(customers);
    } else if (contactType === 'SUPPLIER') {
      setContacts(suppliers);
    } else {
      setCustomers(employees);
    }
  }, [contactType]);

  return (
    <div className="space-y-space12">
      <Tabs onChange={(value) => {}} defaultValue={partyList[0]}>
        <div className="border-b border-color pb-space16">
          <TabsList className="grid grid-cols-3">
            {partyList.map((tab) => (
              <TabsTrigger
                onClick={() => {
                  setContactType(tab.toUpperCase());
                  form.setValue('contactType', tab.toUpperCase());
                }}
                key={tab}
                value={tab}
                className="uppercase"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>
      <DatePicker
        onChange={() => {}}
        contentAlign={'center'}
        triggerClasses={'w-full justify-center'}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-space12"
        >
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
                          <RadioGroupItem value={item.value} />
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
                        <PopoverContent className="w-[200px] p-0 mr-10 ">
                          <Command>
                            {/* <CommandInput placeholder="Search language..." /> */}
                            <CommandEmpty>No language found.</CommandEmpty>
                            <CommandGroup className="max-h-80 overflow-y-scroll">
                              {/* <ScrollArea className="max-h-[200px] scroll-p-4 rounded-md border"> */}
                              {contacts?.map((customer) => (
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

            <Button type="submit" className="w-full">
              Save
            </Button>
          </DrawerFooter>
        </form>
      </Form>
    </div>
  );
};

export default AddMoneyGiveReceived;

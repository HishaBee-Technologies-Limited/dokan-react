import { z } from 'zod';
import { DueEnum } from '@/enum/due';
import React, { useEffect } from 'react';
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
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
  FormLabel,
  FormDescription,
} from '@/components/ui/form';
import FallBackImage from '@/components/common/FallBackImage';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn, formatDate, generateUlid } from '@/lib/utils';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Calendar } from '@/components/ui/calendar';
import { DATE_FORMATS } from '@/lib/constants/common';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import { createDue } from '@/actions/due/createDue';
import { DEFAULT_STARTING_VERSION } from '@/lib/constants/product';
import { createDueItem } from '@/actions/due/createDueItem';
import { useRouter } from 'next/navigation';

const cashType = [
  { value: 'given', label: 'Given', dis: 'You give money' },
  { value: 'received', label: 'Received', dis: 'You received money' },
];

const formSchema = z.object({
  amount: z.string().min(1, {
    message: 'this field is required.',
  }),
  details: z.string(),
  images: z.string(),
  cash_type: z.string(),
  date: z.date().optional(),
});

const MoneyGiveReceived = () => {
  const handleDrawerOpen = useDueStore((state) => state.setDrawerState);
  const due = useDueStore((state) => state.due);
  const cashStatus = useDueStore((state) => state.cashStatus);
  const { getQueryString } = useCreateQueryString();
  const router = useRouter();

  const activeTab = getQueryString('tab') ?? '';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
      details: '',
      images: '',
      cash_type: '',
      date: new Date(),
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const amountPos = Number(due?.due_amount) + Number(data.amount);
    const amountNeg = Number(due?.due_amount) - Number(data.amount);

    const amount = cashStatus === 'Given' ? amountPos : amountNeg;

    const payload = {
      // shop_id: Number(shop_id),
      amount: amount,
      unique_id: due?.unique_id,
      due_left: amount,
      version: Number(due?.version) + 1,
      updated_at: formatDate(DATE_FORMATS.default),
      created_at: formatDate(DATE_FORMATS.default),
      message: data.details,
      contact_mobile: due?.contact_mobile,
      contact_type: activeTab.toLocaleUpperCase(),
      contact_name: due?.contact_name,
      // sms: data.sms ?? false,
      // purchase_unique_id: responseCreatePurchase.data.purchase.unique_id,
    };
    const dueRes = await createDue(payload);
    console.log('dueRes----', dueRes);
    const payloadForDueItem = {
      amount:
        cashStatus === 'Given' ? Number(data.amount) : -Number(data.amount),
      unique_id: generateUlid(),
      due_left: Number(data.amount),
      version: DEFAULT_STARTING_VERSION,
      updated_at: formatDate(DATE_FORMATS.default),
      created_at: formatDate(DATE_FORMATS.default),
      message: data.details,
      contact_mobile: due?.contact_mobile,
      contact_type: activeTab.toLocaleUpperCase(),
      contact_name: due?.contact_name,
      // sms: data.sms ?? false,
      due_unique_id: dueRes?.data.due.unique_id,
      // purchase_unique_id: responseCreatePurchase.data.purchase.unique_id,
    };

    const res = await createDueItem(payloadForDueItem);
    console.log(res);
    router.refresh();
    handleDrawerOpen({ open: false });
    console.log('data------------', data);
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
      handleDrawerOpen({ open: true, header: DueEnum.MONEY_GIVEN_ENTRY });
    } else {
      handleDrawerOpen({ open: true, header: DueEnum.MONEY_RECEIVED_ENTRY });
    }
  }, [form.watch('cash_type')]);

  console.log(cashStatus, due);

  return (
    <div className="space-y-space12">
      <div className="flex items-center gap-space8 border-b border-color pb-space16">
        <FallBackImage src="" fallback={due?.contact_name[0] ?? 'FF'} />
        <article>
          <Text title={due?.contact_name} className="!text-lg font-medium" />
          <Text title={due?.contact_mobile} variant="muted" />
        </article>
      </div>

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
                <FormLabel>Date</FormLabel>
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
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
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
          /> */}

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
              <Switch id="airplane-mode" />
              <Text title="Send SMS" className="text-sm font-medium" />
              <Text
                variant="success"
                className="text-sm font-medium flex items-center gap-space4 bg-success-10 dark:bg-primary-80 py-space4 px-space12 rounded-full"
              >
                <Icon icon="material-symbols:sms" />
                SMS Balance 27
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

export default MoneyGiveReceived;

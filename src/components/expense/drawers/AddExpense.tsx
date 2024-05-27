import { z } from 'zod';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Icon from '@/components/common/Icon';
import { ExpenseEnum } from '@/enum/expense';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from '@/components/common/DatePicker';
import { DrawerFooter } from '@/components/common/Drawer';
import { useExpenseStore } from '@/stores/useExpenseStore';
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
import { ICommonGetResponse } from '@/types/common';
import { ICategory } from '@/types/expense';
import { useFileUpload } from '@/hooks/uploadMultipleFile';
import { format } from 'date-fns';
import { cn, formatDate, generateUlid } from '@/lib/utils';
import { DATE_FORMATS } from '@/lib/constants/common';
import { toast } from 'sonner';
import { addExpense } from '@/actions/expense/addExpense';
import { DEFAULT_STARTING_VERSION } from '@/lib/constants/product';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Skeleton } from '@/components/ui/skeleton';
import { Image } from '@/components/common/Image';
import { useRouter } from 'next/navigation';
import { EXPENSE_DEFAULT_CATEGORIES } from '@/lib/constants/expense';

const formSchema = z.object({
  category_name: z.string().min(2, {
    message: 'this field is required.',
  }),
  amount: z.string(),
  reason: z.string(),
  details: z.string().optional(),
  images: z.string().optional(),
  image_changed: z.boolean().optional(),
  date: z.date(),
});

const AddExpense = ({ categories }: { categories: ICategory[] }) => {
  const router = useRouter();

  const closeDrawer = useExpenseStore((state) => state.setExpenseDrawerState);
  const [selectedFiles, setSelectedFiles] = useState<FileList>();
  const [imageUrls, loading] = useFileUpload(selectedFiles);
  const handleAddNewCategory = useExpenseStore(
    (state) => state.setExpenseDialogState
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category_name: '',
      amount: '',
      details: '',
      reason: '',
      images: '',
      date: new Date(),
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    // closeDrawer({ open: false });
    console.log('data------------', data);

    const res = await addExpense({
      type: data.category_name,
      amount: Number(data.amount),
      details: data.details,
      purpose: data.reason,
      image: data.images ?? '',
      created_at: format(data.date, DATE_FORMATS.default),
      updated_at: formatDate(DATE_FORMATS.default),
      version: DEFAULT_STARTING_VERSION,
      unique_id: generateUlid(),
    });

    console.log('expense------------', res);
    if (res?.success) {
      router.refresh();
      closeDrawer({ open: false });
      toast.success('Expense Added Successfully');
    }

    if (res?.error) {
      toast.error('Something went wrong');

      console.log('error-------', res?.error);
    }
  }

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    setSelectedFiles(selectedFiles);
  };
  useEffect(() => {
    form.setValue('images', imageUrls[0]);
  }, [imageUrls]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-space12">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of Expense</FormLabel>
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
                        <span>Pick a Date</span>
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
          name="category_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Category Name <span className="text-error-100">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Category Name" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <div className="max-h-[24rem] overflow-y-scroll">
                    {EXPENSE_DEFAULT_CATEGORIES.map((category) => (
                      <SelectItem key={category.name} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                    {categories &&
                      categories?.map((category) => (
                        <SelectItem key={category.name} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                  </div>

                  <Button
                    variant={'secondary'}
                    onClick={() =>
                      handleAddNewCategory({
                        open: true,
                        header: ExpenseEnum.ADD_NEW_CATEGORY,
                      })
                    }
                    className="border-x-0 border-b-0 rounded-none w-full sticky -bottom-space6"
                  >
                    Add Category
                  </Button>
                </SelectContent>
              </Select>
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
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Expense Reason" {...field} />
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
                      onChange={handleImageUpload}
                    />
                    <Label
                      htmlFor="image"
                      className="cursor-pointer border border-color w-full h-full rounded-md flex items-center justify-center"
                    >
                      <Icon icon="tabler:link-plus" height={24} width={24} />
                    </Label>
                  </>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        {imageUrls.length ? (
          <div className="w-14">
            <Image src={imageUrls[0]} alt="" height={60} width={60} />
            {loading && <Skeleton className="h-2 w-full rounded-none" />}
          </div>
        ) : null}

        <DrawerFooter>
          <Button
            variant={'secondary'}
            onClick={() => closeDrawer({ open: false })}
            className="w-full"
          >
            Cancel
          </Button>
          <Button type="submit" className="w-full">
            Add
          </Button>
        </DrawerFooter>
      </form>
    </Form>
  );
};

export default AddExpense;

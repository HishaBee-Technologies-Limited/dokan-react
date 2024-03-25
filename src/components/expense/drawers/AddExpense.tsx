import { z } from 'zod';
import React from 'react';
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

const formSchema = z.object({
  category_name: z.string().min(2, {
    message: 'this field is required.',
  }),
  amount: z.string().max(11).min(11, {
    message: 'this field is required.',
  }),
  reason: z.string(),
  details: z.string(),
  images: z.string(),
});

const AddExpense = () => {
  const closeDrawer = useExpenseStore((state) => state.setExpenseDrawerState);
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
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    closeDrawer({ open: false });
    console.log('data------------', data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-space12">
        <DatePicker
          presets
          onChange={() => {}}
          contentAlign={'center'}
          triggerClasses={'w-full justify-center'}
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
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
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
                      {...field}
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

import { z } from 'zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogFooter } from '@/components/common/Dialog';
import { useExpenseStore } from '@/stores/useExpenseStore';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { editExpenseCategory } from '@/actions/category/editExpenseCategory';
import { toast } from 'sonner';
import { ICategory, IExpense } from '@/types/expense';
import { ICommonGetResponse } from '@/types/common';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  category_id: z.string().optional(),
});

const EditCategory = ({
  categories,
}: {
  categories: ICommonGetResponse<ICategory>;
}) => {
  const closeDialog = useExpenseStore((state) => state.setExpenseDialogState);
  const currentCategory = useExpenseStore((state) => state.currentCategory);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      category_id: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log('data------------', data);
    const res = await editExpenseCategory({ name: data.name });
    console.log(res);
    if (res?.success) {
      toast.success('Expense category added');
      closeDialog({ open: false });
    }
    if (!res?.success) {
      toast.error('Expense category not added');
      closeDialog({ open: false });
    }
  }

  useEffect(() => {
    form.setValue('name', currentCategory);
  }, [currentCategory]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-space12">
        <div className="p-space16 space-y-space16">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Category Name <span className="text-error-100">*</span>{' '}
                </FormLabel>
                <FormControl>
                  <Input placeholder="Category Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  Category Color <span className="text-error-100">*</span>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-7 gap-y-space16 justify-items-around"
                  >
                    {Array(14)
                      .fill(0)
                      .map((_, i) => (
                        <FormItem key={i} className="flex justify-center">
                          <FormControl>
                            <RadioGroupItem value={`${i}`} className="hidden" />
                          </FormControl>

                          <FormLabel
                            className={`h-space24 w-space24 bg-primary-40 block rounded-sm 
                                                    ${form.watch('category_id') === `${i}` && 'ring-2 ring-primary-90 dark:ring-primary-40 dark:ring-offset-primary-80 ring-offset-2'}`}
                          />
                        </FormItem>
                      ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>

        <DialogFooter className="flex justify-end gap-space16">
          <Button type="submit" className="w-full">
            save
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default EditCategory;

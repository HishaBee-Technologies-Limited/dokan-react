import { z } from 'zod';
import React from 'react';
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

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  category_id: z.string().min(1, {
    message: 'this field is requeued',
  }),
});

const EditCategory = () => {
  const closeDialog = useExpenseStore((state) => state.setExpenseDialogState);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      category_id: '',
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log('data------------', data);
    closeDialog({ open: false });
  }

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

          <FormField
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
          />
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

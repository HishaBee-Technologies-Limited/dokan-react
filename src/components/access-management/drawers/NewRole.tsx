import { z } from 'zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/common/text';
import { Button } from '@/components/ui/button';
import { contactSchema } from '@/schemas/contacts';
import { zodResolver } from '@hookform/resolvers/zod';
import { DrawerFooter } from '@/components/common/Drawer';
import { useAccessManagementStore } from '@/stores/useAccessManagementStore';
import CheckAccessibleFeatureRow from '@/components/access-management/CheckAccessibleFeatureRow';
import {
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

const NewRole = () => {
  const closeDrawer = useAccessManagementStore((state) => state.setDrawerState);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
    },
  });

  function onSubmit(data: z.infer<typeof contactSchema>) {
    const payload = {
      name: data.name,
    };
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-space12">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Role Name <span className="text-error-100">*</span>{' '}
              </FormLabel>
              <FormControl>
                <Input placeholder={`Role Name`} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Text
          title={'যেসব ফিচারে এক্সেস পাবে'}
          className="font-semibold pt-space12"
        />
        <CheckAccessibleFeatureRow />

        <DrawerFooter>
          <Button type="submit" className="w-full">
            Save
          </Button>
        </DrawerFooter>
      </form>
    </Form>
  );
};

export default NewRole;

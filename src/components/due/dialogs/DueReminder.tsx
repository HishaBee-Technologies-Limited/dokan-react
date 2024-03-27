import React from 'react';
import Icon from '@/components/common/Icon';
import { Text } from '@/components/common/text';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { DialogFooter } from '@/components/common/Dialog';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
} from '@/components/ui/form';
import DatePicker from '@/components/common/DatePicker';

const FormSchema = z.object({
  due_reminder: z.boolean().default(false).optional(),
  receive_sms: z.boolean().default(false).optional(),
  send_sms: z.boolean().default(false).optional(),
});

const DueReminder = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      due_reminder: false,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="w-full space-y-space16 py-space16 px-space12 sm:px-space16">
          <DatePicker
            onChange={() => {}}
            contentAlign={'center'}
            triggerClasses={'w-full justify-center !h-[4.4rem]'}
          />

          <FormField
            control={form.control}
            name="due_reminder"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <FormLabel>
                  Want to receive due reminder notifications?
                </FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="receive_sms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <FormLabel>Do you want to receive SMS?</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="send_sms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <FormLabel>
                  Do you want to send reminder SMS to customers ?
                </FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <DialogFooter className="flex-col !gap-space12">
          <Text
            variant="success"
            className="max-w-max mx-auto mb-space12 text-sm font-medium flex items-center gap-space4 bg-success-10 dark:bg-primary-80 py-space4 px-space12 rounded-full"
          >
            <Icon icon="material-symbols:sms" />
            SMS Balance 27
          </Text>

          <Button type="submit" className="w-full">
            Save
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default DueReminder;

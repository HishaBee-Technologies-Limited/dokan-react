import { z } from 'zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

const formSchema = z.object({
  message: z.string(),
});

const SendingSMS = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    // closeDrawer({ open: false })
    console.log('data------------', data);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex items-center gap-space12 px-space12 py-space8 border-t border-color"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="h-[4.8rem] bg-primary-5"
                  placeholder="Write something here.."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="font-semibold"
          disabled={!form.watch('message').length}
          variant={'success'}
        >
          Send
        </Button>
      </form>
    </Form>
  );
};

export default SendingSMS;

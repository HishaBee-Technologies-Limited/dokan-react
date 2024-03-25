'use client';
import { z } from 'zod';
import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Card from '@/components/common/Card';
import Icon from '@/components/common/Icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import {
  AddIcon,
  ArrowForwardIcon,
  CancelIcon,
} from '@/components/common/icons';

const formSchema = z.object({
  number: z.string().max(11).min(11, {
    message: 'This field is required.',
  }),
});

export const RightSection = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: '',
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log('data------------', data);
  }

  return (
    <div className="lg:pl-space12 lg:border-l border-color h-full lg:w-8/12 flex flex-col gap-space16 justify-between">
      <div className="h-full flex flex-col gap-space24">
        <div className="flex justify-between gap-space16">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <Text title="Input mobile number" className="font-semibold" />
              <div className="flex items-center gap-space12">
                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem className="space-y-0 w-full">
                      <FormControl>
                        <Input placeholder="Mobile Number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  variant={'secondary'}
                  className="!h-[4.4rem] !px-space12"
                >
                  <AddIcon />
                </Button>
              </div>
            </form>
          </Form>

          <div className="flex flex-col items-end gap-space4">
            <Text
              variant="success"
              className="text-sm font-medium flex items-center gap-space4 bg-success-20 dark:bg-primary-80 py-space4 px-space12 rounded-full uppercase"
            >
              <Icon icon="material-symbols:sms" />
              SMS Balance 27
            </Text>
            <Link href="/sms/packages">
              <Button variant={'secondary'} size={'sm'}>
                Buy sms <ArrowForwardIcon />
              </Button>
            </Link>
          </div>
        </div>

        <ScrollArea className="h-full">
          <div className="space-y-space8">
            <Text title="SMS Sending to" className="font-semibold" />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-space8">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <Card
                    key={i}
                    className="px-space12 py-space12 flex justify-center items-center gap-space8"
                  >
                    <Text title="017xxxxxxxx" />

                    <CancelIcon color="red" />
                  </Card>
                ))}
            </div>
          </div>

          <div className="space-y-space8 mt-space16">
            <Card className="px-space12 py-space12 space-y-space8 shadow-sm">
              <Text title="Write your message" className="font-semibold" />

              <Textarea
                placeholder="Write your message here"
                className="resize-none bg-primary-5 h-[14rem]"
              />
            </Card>
            <Text
              title="0 Character  | 1 SMS (160 Character/SMS)"
              variant="secondary"
            />
          </div>
        </ScrollArea>
      </div>
      <Card className="p-space8 py-space12 rounded-none space-y-space8">
        <Button size="sm" className="w-full">
          Send SMS
        </Button>
      </Card>
    </div>
  );
};

'use client';
import { z } from 'zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { PageSubTitle, Text } from '@/components/common/text';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
// import { Image } from "@/components/common/Image"
import { Switch } from '@/components/ui/switch';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';

const formSchema = z.object({
  lang: z.string(),
  page_size: z.string(),
  font_size: z.string(),
  additional_text: z.string(),
  qr_code: z.boolean(),
});

const ConfigurationPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lang: 'en',
      page_size: '44mm',
      font_size: 'sm',
      qr_code: false,
      additional_text: '',
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    // closeDrawer({ open: false })
    console.log('data------------', data);
  }

  return (
    <div className="md:flex items-start gap-space16 w-full h-full">
      <ScrollArea className="space-y-space24 max-w-[54rem] w-full h-full overflow-y-scroll pr-space16 mx-auto">
        <PageSubTitle title="Printer Configuration" />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-space12 pb-space12"
          >
            <FormField
              control={form.control}
              name="lang"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between gap-space24 py-space24">
                  <FormLabel>
                    <Text
                      title="Language"
                      className="font-semibold mb-space8"
                    />
                    <Text
                      title="Printer Language show"
                      className="font-medium text-sm"
                      variant="secondary"
                    />
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="max-w-[14.8rem]">
                          <SelectValue placeholder="Language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="bn">Bangla</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="page_size"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between gap-space24 py-space24 border-y border-color">
                  <FormLabel>
                    <Text
                      title="Printer size"
                      className="font-semibold mb-space8"
                    />
                    <Text
                      title="Set the printer paper size"
                      className="font-medium text-sm"
                      variant="secondary"
                    />
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="max-w-[14.8rem]">
                          <SelectValue placeholder="Size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="44mm">44mm</SelectItem>
                        <SelectItem value="72mm">72mm</SelectItem>
                        <SelectItem value="A4">A4</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="font_size"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between gap-space24 py-space24">
                  <FormLabel>
                    <Text
                      title="Printer Text size"
                      className="font-semibold mb-space8"
                    />
                    <Text
                      title="Set the printer paper size"
                      className="font-medium text-sm"
                      variant="secondary"
                    />
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="max-w-[14.8rem]">
                          <SelectValue placeholder="Font Size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="sm">14</SelectItem>
                        <SelectItem value="md">16</SelectItem>
                        <SelectItem value="lg">20</SelectItem>
                        <SelectItem value="xl">24</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="qr_code"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between gap-space24 py-space24 border-y border-color">
                  <FormLabel>
                    <Text title="QR Code" className="font-semibold mb-space8" />
                    <Text
                      title="Turn ON/OFF to Show/Hide QR Code on receipt"
                      className="font-medium text-sm"
                      variant="secondary"
                    />
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="additional_text"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-space12 py-space24">
                  <FormLabel>
                    <Text
                      title="Additional Text"
                      className="font-semibold mb-space8"
                    />
                    <Text
                      title="Write here to include text in the receipt"
                      className="font-medium text-sm"
                      variant="secondary"
                    />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="additional text will be  given here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-space16">
              <Button type="button" variant={'secondary'}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </ScrollArea>

      <div className="w-full md:w-1/2 h-auto xl:h-[90%]">
        <Image
          alt=""
          width={300}
          height={500}
          sizes="100vw"
          src={
            form.watch('page_size') === 'A4'
              ? '/images/a4.svg'
              : '/images/small.svg'
          }
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default ConfigurationPage;

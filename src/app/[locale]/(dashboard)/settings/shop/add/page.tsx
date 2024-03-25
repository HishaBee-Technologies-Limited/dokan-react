'use client';
import React from 'react';
import Card from '@/components/common/Card';
import { Image } from '@/components/common/Image';
import { PageSubTitle, Text } from '@/components/common/text';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const cashType = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'this field is required.',
  }),
  shop_type: z.string().min(1, {
    message: 'this field is required.',
  }),
  shop_image: z.string(),
  division: z.string(),
  district: z.string(),
  area: z.string(),
  address: z.string(),
  sell_type: z.string(),
});

const AddShopPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      shop_type: '',
      shop_image: '',
      division: '',
      district: '',
      address: '',
      area: '',
      sell_type: '',
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log('data------------', data);
  }

  return (
    <div className="space-y-space16 pb-space16">
      <PageSubTitle title="Create new shop" />

      <div className="max-w-[53rem]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="space-y-space12 px-space16 py-space16">
              <FormField
                control={form.control}
                name="shop_image"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center justify-center gap-space16 py-space12">
                    <div className="h-[10rem] w-[10rem] bg-primary-5 dark:bg-primary-80 border border-color rounded-full flex items-center justify-center">
                      <Image
                        src={`/images/update_shop.svg`}
                        alt=""
                        height={54}
                        width={54}
                      />
                    </div>

                    <label className="cursor-pointer">
                      <input type="file" className="hidden" {...field} />

                      <p className="text-blue-600 text-sm font-medium text-center">
                        Add a logo of your Shop
                      </p>
                    </label>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Shop Name <span className="text-error-100">*</span>{' '}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Shop Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shop_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Shop Type <span className="text-error-100">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="">
                          <SelectValue placeholder="Shop type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <div className="max-h-[24rem] overflow-y-scroll">
                          <SelectItem value="m@example.com">
                            m@example.com
                          </SelectItem>
                          <SelectItem value="m@google.com">
                            m@google.com
                          </SelectItem>
                          <SelectItem value="m@support.com">
                            m@support.com
                          </SelectItem>
                        </div>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-space8 sm:gap-space16">
                <FormField
                  control={form.control}
                  name="division"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Division</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="">
                            <SelectValue placeholder="Division" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <div className="max-h-[24rem] overflow-y-scroll">
                            <SelectItem value="m@example.com">
                              m@example.com
                            </SelectItem>
                            <SelectItem value="m@google.com">
                              m@google.com
                            </SelectItem>
                            <SelectItem value="m@support.com">
                              m@support.com
                            </SelectItem>
                          </div>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>District</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="">
                            <SelectValue placeholder="District" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <div className="max-h-[24rem] overflow-y-scroll">
                            <SelectItem value="m@example.com">
                              m@example.com
                            </SelectItem>
                            <SelectItem value="m@google.com">
                              m@google.com
                            </SelectItem>
                            <SelectItem value="m@support.com">
                              m@support.com
                            </SelectItem>
                          </div>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area </FormLabel>
                    <FormControl>
                      <Input placeholder="Area" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address </FormLabel>
                    <FormControl>
                      <Input placeholder="Address" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sell_type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Do you want to sell Online?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 gap-space8 sm:gap-space16"
                      >
                        {cashType.map((item) => (
                          <FormItem
                            key={item.value}
                            className={`flex rounded-lg border border-color py-space12 px-space12 gap-space8 w-full`}
                          >
                            <FormControl>
                              <RadioGroupItem value={item.value} />
                            </FormControl>
                            <FormLabel className="font-normal w-full">
                              <Text
                                title={item.label}
                                className="font-medium"
                              />
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Text
                title={`This number will be visible to everyone and they will contact you through this number. Alternatively provide Helpline number if you have any.`}
                variant="secondary"
              />
            </Card>

            <div className="flex justify-end gap-space12 mt-space16">
              <Button variant={'secondary'} className="!px-space40">
                Cancel
              </Button>
              <Button type="submit">Create Shop</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddShopPage;

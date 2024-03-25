'use client';
import { z } from 'zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { getDivisions } from '@/actions/publicData';
import { Skeleton } from '@/components/ui/skeleton';
import { saveSignupInfo } from '@/actions/saveSignupInfo';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  brand_name: z.string(),
  area: z.string(),
  address: z.string(),
  division: z.string(),
  district: z.string(),
  user_intent: z.string(),
});

const Information = () => {
  const [divisions, setDivisions] = useState<{ division: string }[] | null>(
    null
  );
  const [districts, setDistricts] = useState<{ district: string }[] | null>(
    null
  );
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand_name: '',
      area: '',
      address: '',
      division: '',
      district: '',
    },
  });

  async function onSubmit({
    brand_name,
    address,
    area,
    district,
    division,
    user_intent,
  }: z.infer<typeof formSchema>) {
    // closeDrawer({ open: false })
    // console.log("data------------", data);
    const fullAddress = `${address}, ${area}, ${district}, ${division}}`;
    await saveSignupInfo({ brand_name, address: fullAddress, user_intent });
    router.push('/auth/setup-pin');
  }

  useEffect(() => {
    const getBdPublicDaa = async () => {
      setLoading(true);
      const res = await getDivisions();
      if (res?.success) {
        setLoading(true);

        setDivisions(res?.data?.division.data);
        setDistricts(res?.data?.district.data);
      } else {
        setError(res?.error);
        setLoading(false);
      }
    };
    getBdPublicDaa();
  }, []);
  return (
    <div>
      <Text
        title="Tell us about your business"
        className="mb-space16 text-[2.8rem] font-semibold"
      />
      <Text
        title="Tell us about your business"
        variant="secondary"
        className="mb-space32 font-semibold"
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-space12"
        >
          <FormField
            control={form.control}
            name="brand_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Business name <span className="text-error-100">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Business name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="gap-space8 sm:gap-space16 grid grid-cols-2">
            <FormField
              control={form.control}
              name="division"
              render={({ field }) => (
                <FormItem className="flex flex-col ">
                  <FormLabel>Division</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'h-16 w-[200px] justify-between bg-white',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value
                            ? divisions?.find(
                                (division) => division.division === field.value
                              )?.division
                            : 'Select Division'}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search Division..."
                          className="h-12"
                        />
                        <CommandEmpty className="h-12 p-2">
                          No division found.
                        </CommandEmpty>
                        <CommandGroup className="max-h-80 overflow-scroll">
                          {loading ? (
                            divisions?.map((division) => (
                              <CommandItem
                                value={division.division}
                                key={division.division}
                                onSelect={() => {
                                  form.setValue('division', division.division);
                                }}
                              >
                                {division.division}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    division.division === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))
                          ) : (
                            <div className="flex flex-col gap-2 p-2">
                              <Skeleton className="h-8 w-full" />
                              <Skeleton className="h-6 w-full" />
                              <Skeleton className="h-4 w-full" />
                            </div>
                          )}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem className="flex flex-col ">
                  <FormLabel>District</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'h-16 w-[200px] justify-between bg-white',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value
                            ? districts?.find(
                                (district) => district.district === field.value
                              )?.district
                            : 'Select District'}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search District..."
                          className="h-12"
                        />
                        <CommandEmpty>No district found.</CommandEmpty>
                        <CommandGroup className="max-h-80 overflow-scroll">
                          {loading ? (
                            districts?.map((district) => (
                              <CommandItem
                                value={district.district}
                                key={district.district}
                                onSelect={() => {
                                  form.setValue('district', district.district);
                                }}
                              >
                                {district.district}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    district.district === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))
                          ) : (
                            <div className="flex flex-col gap-2 p-2">
                              <Skeleton className="h-8 w-full" />
                              <Skeleton className="h-6 w-full" />
                              <Skeleton className="h-4 w-full" />
                            </div>
                          )}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {/* <FormDescription>
                    This is the language that will be used in the dashboard.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area</FormLabel>
                <FormControl>
                  <Input placeholder="Area" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="user_intent"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>How do you want to use this app</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="BOOK_KEEPING" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Book Keeping
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="ONLINE_SELL" />
                      </FormControl>
                      <FormLabel className="font-normal">Online Sell</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="BOTH" />
                      </FormControl>
                      <FormLabel className="font-normal">Both</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={!form.formState.isValid}
          >
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Information;

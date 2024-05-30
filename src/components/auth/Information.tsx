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
import { saveSignupInfo } from '@/actions/saveSignupInfo';
import { useRouter } from 'next/navigation';
import { getAreasAndTypes } from '@/actions/shop/getAreaAndTypes';
import { IAllArea } from '@/types/shop';

const formSchema = z.object({
  brand_name: z.string(),
  // area: z.number(),
  address: z.string(),
  // division: z.string().optional(),
  // district: z.string().optional(),
  use_intent: z.string(),
});

const Information = () => {
  const [divisions, setDivisions] = useState<IAllArea[]>();

  const [open, setOpen] = React.useState(false);
  const [divisionValue, setDivisionValue] = React.useState('');

  const [openDistrict, setOpenDistrict] = React.useState(false);
  const [districtValue, setDistrictValue] = React.useState('');
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  async function onSubmit({
    brand_name,
    address,

    use_intent,
  }: z.infer<typeof formSchema>) {
    // closeDrawer({ open: false })
    // console.log("data------------", data);
    // const fullAddress = `${address}, ${area}, ${district}, ${division}}`;/

    await saveSignupInfo({ brand_name, address: address, use_intent });
    router.push('/auth/setup-pin');
  }

  useEffect(() => {
    const getAllAreas = async () => {
      const res = await getAreasAndTypes();
      setDivisions(res?.data?.areaData);
    };
    getAllAreas();
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

          {/* <div className="gap-space8 sm:gap-space16 flex ">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[350px] justify-between"
                >
                  {divisionValue
                    ? divisions?.find(
                        (division) => String(division.id) === divisionValue
                      )?.name
                    : 'Select Divisions...'}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[350px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Search framework..."
                    className="h-12"
                  />
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {divisions?.map((division) => (
                      <CommandItem
                        key={division.id}
                        value={String(division.id)}
                        onSelect={(currentValue) => {
                          setDivisionValue(
                            currentValue === String(divisionValue)
                              ? ''
                              : currentValue
                          );
                          setOpen(false);
                        }}
                      >
                        {division.name}
                        <CheckIcon
                          className={cn(
                            'ml-auto h-4 w-4',
                            divisionValue === String(division.id)
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <Popover open={openDistrict} onOpenChange={setOpenDistrict}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openDistrict}
                  className="w-[320px] justify-between"
                >
                  {districtValue
                    ? divisions
                        ?.find(
                          (division) => String(division.id) === divisionValue
                        )
                        ?.districts.find(
                          (district) => String(district.id) === districtValue
                        )?.name
                    : 'Select Districts...'}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[320px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Search Districts..."
                    className="h-12"
                  />
                  <CommandEmpty>No district found.</CommandEmpty>
                  <CommandGroup>
                    {divisions
                      ?.find(
                        (division) => String(division.id) === divisionValue
                      )
                      ?.districts.map((district) => (
                        <CommandItem
                          key={district.id}
                          value={String(district.id)}
                          onSelect={(currentValue) => {
                            setDistrictValue(
                              currentValue === String(districtValue)
                                ? ''
                                : currentValue
                            );
                            setOpenDistrict(false);
                          }}
                        >
                          {district.name}
                          <CheckIcon
                            className={cn(
                              'ml-auto h-4 w-4',
                              districtValue === String(district.id)
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div> */}
          {/* 
          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openDistrict}
                      className={cn(
                        'h-16 w-full justify-between bg-white',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value
                        ? divisions
                            ?.find(
                              (division) =>
                                String(division.id) === divisionValue
                            )
                            ?.districts.find(
                              (district) =>
                                String(district.id) === districtValue
                            )
                            ?.areas?.find((area) => area.id === field.value)
                            ?.name
                        : 'Select Area...'}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[600px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search Districts..."
                        className="h-12"
                      />
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup className="max-h-80 overflow-scroll">
                        {divisions
                          ?.find(
                            (division) => String(division.id) === divisionValue
                          )
                          ?.districts.find(
                            (district) => String(district.id) === districtValue
                          )
                          ?.areas?.map((area) => (
                            <CommandItem
                              key={area.id}
                              value={String(area.id)}
                              onSelect={() => {
                                form.setValue('area', area.id);
                              }}
                            >
                              {area.name}
                              <CheckIcon
                                className={cn(
                                  'ml-auto h-4 w-4',
                                  field.value === area.id
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          /> */}

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
            name="use_intent"
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
            // disabled={!form.formState.isValid}
          >
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Information;

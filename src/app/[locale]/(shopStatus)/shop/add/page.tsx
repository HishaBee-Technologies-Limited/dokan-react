'use client';
import React, { useEffect, useState } from 'react';
import Card from '@/components/common/Card';
import { Image } from '@/components/common/Image';
import { PageSubTitle, Text } from '@/components/common/text';

import { z } from 'zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowForwardIcon } from '@/components/common/icons';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
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
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { getAreasAndTypes } from '@/actions/shop/getAreaAndTypes';
import { IAllArea } from '@/types/shop';
import { cashType } from '@/lib/constants/shop';
import { createShops } from '@/actions/shop/createShop';
import { useRouter } from 'next/navigation';
import { ShopSchema } from '@/schemas/shop';

const AddShopPage = () => {
  const form = useForm<z.infer<typeof ShopSchema>>({
    resolver: zodResolver(ShopSchema),
    defaultValues: {
      name: '',
      address: '',
      sell_type: '',
    },
  });
  const [divisions, setDivisions] = useState<IAllArea[]>();
  const [open, setOpen] = React.useState(false);
  const [divisionValue, setDivisionValue] = React.useState('');

  const [openDistrict, setOpenDistrict] = React.useState(false);
  const [districtValue, setDistrictValue] = React.useState('');
  const [types, setTypes] = useState<any[]>([]);

  const router = useRouter();

  async function onSubmit({
    name,
    address,
    area,
    shop_type,
    sell_type,
  }: z.infer<typeof ShopSchema>) {
    const res = await createShops({
      name,
      address,
      area,
      type: shop_type,
      publicData: Number(sell_type),
    });
    if (res?.success) {
      router.push('/shop');
      router.refresh();
    }
  }

  useEffect(() => {
    const getAllAreas = async () => {
      const res = await getAreasAndTypes();
      setDivisions(res?.data?.areaData);
      setTypes(res?.data?.typesData);
    };
    getAllAreas();
  }, []);

  return (
    <div className="space-y-space16 pb-space16">
      <div className="gap-space16 flex items-center">
        <Link href={'/shop'}>
          <ArrowForwardIcon rotate={2} />
        </Link>
        <PageSubTitle title="Create shop" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="space-y-space12 px-space16 py-space16">
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'h-16 w-full justify-between bg-white',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value
                          ? types?.find((type) => type.id === field.value)?.name
                          : 'Select type...'}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[600px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search type..."
                          className="h-12"
                        />
                        <CommandEmpty>No type found.</CommandEmpty>
                        <CommandGroup className="max-h-80 overflow-scroll">
                          {types?.map((type) => (
                            <CommandItem
                              key={type.id}
                              value={String(type.id)}
                              onSelect={() => {
                                form.setValue('shop_type', type.id);
                              }}
                            >
                              {type.name}
                              <CheckIcon
                                className={cn(
                                  'ml-auto h-4 w-4',
                                  field.value === type.id
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
            />

            <div className="gap-space8 sm:gap-space16 grid grid-cols-2">
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
                    <CommandEmpty>No framework found.</CommandEmpty>
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
            </div>

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
                              (division) =>
                                String(division.id) === divisionValue
                            )
                            ?.districts.find(
                              (district) =>
                                String(district.id) === districtValue
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
                      className="gap-space8 sm:gap-space16 grid grid-cols-2"
                    >
                      {cashType.map((item) => (
                        <FormItem
                          key={item.value}
                          className={`border-color py-space12 px-space12 gap-space8 flex w-full rounded-lg border`}
                        >
                          <FormControl>
                            <RadioGroupItem value={item.value} />
                          </FormControl>
                          <FormLabel className="w-full font-normal">
                            <Text title={item.label} className="font-medium" />
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

          <div className="gap-space12 mt-space16 flex justify-end">
            <Button variant={'secondary'} className="!px-space40">
              Cancel
            </Button>
            <Button type="submit" disabled={!form.formState.isValid}>
              Create Shop
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddShopPage;

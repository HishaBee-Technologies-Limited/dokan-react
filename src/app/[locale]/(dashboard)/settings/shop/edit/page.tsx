'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
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
import { ShopSchema } from '@/schemas/shop';
import { IAllArea } from '@/types/shop';
import { getAreasAndTypes } from '@/actions/shop/getAreaAndTypes';
import { useRouter, useSearchParams } from 'next/navigation';
import { getShopInfo } from '@/actions/shop/getShopInfo';
import { getAreaInfo } from '@/actions/shop/getArea';
import { updateShop } from '@/actions/shop/updateShop';
import { toast } from 'sonner';
import { useFileUpload } from '@/hooks/uploadMultipleFile';

const EditShopPage = () => {
  const form = useForm<z.infer<typeof ShopSchema>>({
    resolver: zodResolver(ShopSchema),
    defaultValues: {
      name: '',
      address: '',
      number: '',
    },
  });
  const [divisions, setDivisions] = useState<IAllArea[]>();
  const [open, setOpen] = React.useState(false);
  const [divisionValue, setDivisionValue] = React.useState('');
  const [openDistrict, setOpenDistrict] = React.useState(false);
  const [openArea, setOpenArea] = React.useState(false);
  const [openTypes, setOpenTypes] = React.useState(false);
  const [districtValue, setDistrictValue] = React.useState('');
  const [types, setTypes] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState<FileList>();
  const [imageUrls, loading] = useFileUpload(selectedFiles);

  const shopId = searchParams.get('shopId');

  async function onSubmit({
    name,
    shop_type,
    address,
    number,
    area,
    logo_url,
  }: z.infer<typeof ShopSchema>) {
    console.log(shopId, address);
    if (shopId) {
      const res = await updateShop({
        shopId: Number(shopId),
        name,
        type: shop_type,
        address,
        area,
        public_number: number,
        logo_url,
      });
      if (res?.success) {
        router.push('/settings/shop');
        router.refresh();
      }
      if (res?.error) {
        toast.error('Something went wrong');
      }
    }
  }

  useEffect(() => {
    const getAllAreasAndTypes = async () => {
      const shopInfo = await getShopInfo(shopId as string);
      console.log(shopInfo);
      if (shopInfo?.success) {
        form.setValue('address', shopInfo?.data?.shop?.address ?? '');
        form.setValue('name', shopInfo?.data?.shop?.name ?? '');
        form.setValue('number', shopInfo?.data?.shop?.public_number ?? '');
        form.setValue('shop_type', shopInfo?.data?.shop?.type ?? 0);
        form.setValue('logo_url', shopInfo?.data?.shop?.logo_url);

        const areaData = await getAreaInfo(`${shopInfo?.data?.shop?.area}`);

        if (areaData?.success) {
          setDivisionValue(areaData?.data?.division.id);
          setDistrictValue(areaData?.data?.district.id);
          form.setValue('area', areaData?.data?.area.id);
        }
      }
      const res = await getAreasAndTypes();
      if (res?.success) {
        setDivisions(res?.data?.areaData);
        setTypes(res?.data?.typesData);
      }
    };
    getAllAreasAndTypes();
  }, []);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    setSelectedFiles(selectedFiles);
  };

  useEffect(() => {
    form.setValue('logo_url', imageUrls[0]);
  }, [imageUrls]);

  return (
    <div className="space-y-space16 pb-space16">
      <div className="flex items-center gap-space16">
        <Link href={'/settings/shop'}>
          <ArrowForwardIcon rotate={2} />
        </Link>

        <PageSubTitle title="Edit Shop" />
      </div>
      <div className="max-w-[53rem]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="space-y-space12 px-space16 py-space16">
              <FormField
                control={form.control}
                name="logo_url"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center justify-center gap-space16 py-space12">
                    <div className="h-[10rem] w-[10rem] bg-primary-5 dark:bg-primary-80 border border-color rounded-full flex items-center justify-center">
                      <img
                        src={`${field.value ?? '/images/update_shop.svg'}`}
                        alt=""
                        height={54}
                        width={54}
                      />
                    </div>

                    <label className="cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleImageUpload}
                      />

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
                    <Popover open={openTypes} onOpenChange={setOpenTypes}>
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
                            ? types?.find((type) => type.id === field.value)
                                ?.name
                            : 'Select Type...'}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[600px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search Type..."
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
                                  setOpenTypes(false);
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
                      className="justify-between"
                    >
                      {divisionValue
                        ? divisions?.find(
                            (division) =>
                              String(division.id) === String(divisionValue)
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
                      <CommandEmpty>No division found.</CommandEmpty>
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
                                String(divisionValue) === String(division.id)
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
                      className=" justify-between"
                    >
                      {districtValue
                        ? divisions
                            ?.find(
                              (division) =>
                                String(division.id) === String(divisionValue)
                            )
                            ?.districts.find(
                              (district) =>
                                String(district.id) === String(districtValue)
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
                      <CommandEmpty>No districts found.</CommandEmpty>
                      <CommandGroup>
                        {divisions
                          ?.find(
                            (division) =>
                              String(division.id) === String(divisionValue)
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
                                  String(districtValue) === String(district.id)
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
                    <Popover open={openArea} onOpenChange={setOpenArea}>
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
                            ? divisions
                                ?.find(
                                  (division) =>
                                    String(division.id) ===
                                    String(divisionValue)
                                )
                                ?.districts.find(
                                  (district) =>
                                    String(district.id) ===
                                    String(districtValue)
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
                          <CommandEmpty>No area found.</CommandEmpty>
                          <CommandGroup className="max-h-80 overflow-scroll">
                            {divisions
                              ?.find(
                                (division) =>
                                  String(division.id) === String(divisionValue)
                              )
                              ?.districts.find(
                                (district) =>
                                  String(district.id) === String(districtValue)
                              )
                              ?.areas?.map((area) => (
                                <CommandItem
                                  key={area.id}
                                  value={String(area.id)}
                                  onSelect={() => {
                                    form.setValue('area', area.id);
                                    setOpenArea(false);
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
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Public visible Number </FormLabel>
                    <FormControl>
                      <Input placeholder="Number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Text
                title={`This number will be visible to everyone and they will contact you through this number. Alternatively provide Helpline number if you have any.`}
                variant="secondary"
              />
            </Card>
            {form.formState.errors.root?.message?.length && (
              <Text title="No changes made" variant="error" />
            )}
            <div className="flex justify-end gap-space12 mt-space16">
              <Button variant={'secondary'} className="!px-space40">
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditShopPage;

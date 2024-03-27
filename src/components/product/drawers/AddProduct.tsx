import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import Icon from '@/components/common/Icon';
import Card from '@/components/common/Card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Text } from '@/components/common/text';
import { Image } from '@/components/common/Image';
import { zodResolver } from '@hookform/resolvers/zod';
import { DrawerFooter } from '@/components/common/Drawer';
import { v4 as uuidv4 } from 'uuid';

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
import { IUnits } from '@/types/product';
import { ProductFormDef, ProductSchema } from '@/schemas/products';
import {
  DEFAULT_STARTING_VERSION,
  DISCOUNT_TYPE,
  WARRANTY_TYPE,
} from '@/lib/constants/product';
import { createProductOrUpdate } from '@/actions/product/createProductOrUpdate';
import { format } from 'date-fns';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export const AddProduct = ({
  units,
  productCategories,
}: {
  units: IUnits[];
  productCategories: any;
}) => {
  const form = useForm<ProductFormDef>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      files: [],
      product_name: '',
      stock: '',
      purchase_price: '',
      sell_price: '',
      // others------------
      bulk_price: '',
      bulk_quantity: '',
      low_stock: '',
      vat_percentage: '',
      warranty_duration: '',
      discount: '',
      // boolean
      online_sell: false,
      low_stock_check: false,
      vat_check: false,
      warranty_check: false,
      discount_check: false,
      bulk_sell_check: false,
    },
  });
  const router = useRouter();

  const shopId = getCookie('shopId');
  const uuid = uuidv4();

  const selectedCategory = form.watch('category');

  const subCategory = useMemo(() => {
    return productCategories.find(
      (productCategory: { id: number }) =>
        Number(selectedCategory) === productCategory.id
    )?.sub_category;
  }, [selectedCategory, productCategories]);

  console.log(subCategory);

  async function onSubmit(data: ProductFormDef) {
    // closeDrawer({ open: false })
    console.log('data------------', data);

    const res = await createProductOrUpdate({
      name: data.product_name,
      cost_price: data.purchase_price,
      sell_online: data.online_sell,
      stock: Number(data.stock),
      version: DEFAULT_STARTING_VERSION,
      created_at: format(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
      sub_category: Number(data.sub_category),
      wholesale_amount: Number(data.bulk_quantity),
      wholesale_price: Number(data.bulk_price),
      stock_alert: Number(data.low_stock),
      warranty: Number(data.warranty_duration),
      warranty_type: data.warranty_type,
      discount: data.discount,
      discount_type: data.discount_type,
      // description: ,
      vat_applicable: data.vat_check,
      vat_percent: Number(data.vat_percentage),
      unique_id: uuid + shopId + Date.now(),
      selling_price: Number(data.purchase_price),
      updated_at: format(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
      unit: Number(data.unit),
    });
    if (res?.success) {
      router.refresh();
    }
    console.log(res);
  }
  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-space12">
        <div>
          <FormField
            control={form.control}
            name="files"
            render={({ field }) => (
              <FormItem className="border border-dashed border-color rounded-lg py-space16 px-space12 flex flex-col items-center">
                <Icon icon="ion:cloud-upload-outline" height={24} width={24} />

                <FormControl>
                  <Input id="files" type="file" {...field} className="hidden" />
                </FormControl>

                <Text className="text-sm">
                  <label
                    htmlFor="files"
                    className="cursor-pointer underline rounded-md pr-space8"
                  >
                    Click to upload
                  </label>
                  or drag & drop
                </Text>
                <Text
                  title="JPG, PNG Image files, up to 5MB"
                  variant="muted"
                  className="text-sm"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-space12 py-space12">
            <Image src={''} alt="" height={60} width={60} />
            <Image src={''} alt="" height={60} width={60} />
          </div>
        </div>

        <Text
          title="Product Details"
          className="uppercase font-semibold border-b border-color pb-space-8"
        />

        <FormField
          control={form.control}
          name="product_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Product Name <span className="text-error-100">*</span>{' '}
              </FormLabel>
              <FormControl>
                <Input placeholder="Product Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Stock</FormLabel>
              <FormControl>
                <Input placeholder="Current Stock" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="grid sm:grid-cols-2 gap-space12">
          <FormField
            control={form.control}
            name="purchase_price"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Purchase Price" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sell_price"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Sell Price" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="online_sell"
          render={({ field }) => (
            <FormItem className="flex justify-between items-center gap-space8 border border-color rounded-lg px-space12 py-space6 ">
              <FormLabel>
                <Text
                  title="Want to sell this product online?"
                  className="text-sm"
                />
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

        <Text
          title="Advanced product details"
          className="uppercase font-semibold border-b border-color pb-space-8"
        />
        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Units</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Unit" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {units?.map((unit) => (
                    <SelectItem key={unit.id} value={String(unit.id)}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid sm:grid-cols-2 gap-space12">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <FormControl>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Category Name" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <div className="max-h-[24rem] overflow-y-scroll">
                      {productCategories.map(
                        (category: { id: number; name: string }) => (
                          <SelectItem
                            key={category.id}
                            value={String(category.id)}
                          >
                            {category.name}
                          </SelectItem>
                        )
                      )}
                    </div>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sub_category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub-Category Name</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                  disabled={!subCategory}
                >
                  <FormControl>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Sub-Category Name" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <div className="max-h-[24rem] overflow-y-scroll">
                      {subCategory?.map(
                        (subCategory: { id: number; name: string }) => (
                          <SelectItem
                            key={subCategory.id}
                            value={String(subCategory.id)}
                          >
                            {subCategory.name}
                          </SelectItem>
                        )
                      )}
                    </div>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <Text
          title="Others"
          className="uppercase font-semibold border-b border-color pb-space-8"
        />

        <div
          className={`${
            form.watch('bulk_sell_check')
              ? ' bg-primary-10 dark:bg-primary-90'
              : ''
          } border border-color rounded-lg duration-500`}
        >
          <FormField
            control={form.control}
            name="bulk_sell_check"
            render={({ field }) => (
              <FormItem className="flex justify-between items-center gap-space8 px-space12 py-space8">
                <FormLabel>
                  <Text
                    title="Want to sell this in Bulk?"
                    className="text-sm"
                  />
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

          <div
            className={`grid ${
              form.watch('bulk_sell_check')
                ? 'grid-rows-[1fr]'
                : 'grid-rows-[0fr]'
            } duration-500`}
          >
            <div
              className={`${
                form.watch('bulk_sell_check')
                  ? 'py-space8 border-t border-color'
                  : ''
              } px-space12 overflow-hidden`}
            >
              <div className="grid sm:grid-cols-2 gap-space12">
                <FormField
                  control={form.control}
                  name="bulk_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bulk price</FormLabel>
                      <FormControl>
                        <Input placeholder="Bulk price" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bulk_quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum order quantity</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Minimum order quantity"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${
            form.watch('low_stock_check')
              ? ' bg-primary-10 dark:bg-primary-90'
              : ''
          } border border-color rounded-lg duration-500`}
        >
          <FormField
            control={form.control}
            name="low_stock_check"
            render={({ field }) => (
              <FormItem className="flex justify-between items-center gap-space8 px-space12 py-space8">
                <FormLabel>
                  <Text title="Low stock alert" className="text-sm" />
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

          <div
            className={`grid ${
              form.watch('low_stock_check')
                ? 'grid-rows-[1fr]'
                : 'grid-rows-[0fr]'
            } duration-500`}
          >
            <div
              className={`${
                form.watch('low_stock_check')
                  ? 'py-space8 border-t border-color'
                  : ''
              } px-space12 overflow-hidden`}
            >
              <FormField
                control={form.control}
                name="low_stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Amount You Want To Set Alert On</FormLabel>
                    <FormControl>
                      <Input placeholder="Stock" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div
          className={`${
            form.watch('vat_check') ? ' bg-primary-10 dark:bg-primary-90' : ''
          } border border-color rounded-lg duration-500`}
        >
          <FormField
            control={form.control}
            name="vat_check"
            render={({ field }) => (
              <FormItem className="flex justify-between items-center gap-space8 px-space12 py-space8">
                <FormLabel>
                  <Text title="Vat applicable" className="text-sm" />
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

          <div
            className={`grid ${
              form.watch('vat_check') ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            } duration-500`}
          >
            <div
              className={`${
                form.watch('vat_check') ? 'py-space8 border-t border-color' : ''
              } px-space12 overflow-hidden`}
            >
              <FormField
                control={form.control}
                name="vat_percentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vat percentage (%)</FormLabel>
                    <FormControl>
                      <Input placeholder="Vat  percentage (%)" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div
          className={`${
            form.watch('warranty_check')
              ? ' bg-primary-10 dark:bg-primary-90'
              : ''
          } border border-color rounded-lg duration-500`}
        >
          <FormField
            control={form.control}
            name="warranty_check"
            render={({ field }) => (
              <FormItem className="flex justify-between items-center gap-space8 px-space12 py-space8">
                <FormLabel>
                  <Text title="Warranty" className="text-sm" />
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

          <div
            className={`grid ${
              form.watch('warranty_check')
                ? 'grid-rows-[1fr]'
                : 'grid-rows-[0fr]'
            } duration-500`}
          >
            <div
              className={`${
                form.watch('warranty_check')
                  ? 'py-space8 border-t border-color'
                  : ''
              } px-space12 overflow-hidden`}
            >
              <Text title="Days after sale date" />
              <Card className="flex justify-between border border-color gap-space12 dark:!bg-primary-100">
                <FormField
                  control={form.control}
                  name="warranty_duration"
                  render={({ field }) => (
                    <FormItem className="w-3/4">
                      <FormControl>
                        <Input
                          placeholder="Duration"
                          className="border-0 focus:border-0"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="warranty_type"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-space12">
                      |
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-0 px-space4 focus:outline-none focus:border-none">
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent align="end" side="top">
                          {WARRANTY_TYPE.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </Card>
            </div>
          </div>
        </div>
        <div
          className={`${
            form.watch('discount_check')
              ? ' bg-primary-10 dark:bg-primary-90'
              : ''
          } border border-color rounded-lg duration-500`}
        >
          <FormField
            control={form.control}
            name="discount_check"
            render={({ field }) => (
              <FormItem className="flex justify-between items-center gap-space8 px-space12 py-space8">
                <FormLabel>
                  <Text title="Discount" className="text-sm" />
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

          <div
            className={`grid ${
              form.watch('discount_check')
                ? 'grid-rows-[1fr]'
                : 'grid-rows-[0fr]'
            } duration-500`}
          >
            <div
              className={`${
                form.watch('discount_check')
                  ? 'py-space8 border-t border-color'
                  : ''
              } px-space12 overflow-hidden`}
            >
              <Text title="Discount" />
              <Card className="flex justify-between border border-color gap-space12 dark:!bg-primary-100">
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem className="w-3/4">
                      <FormControl>
                        <Input
                          placeholder="Discount"
                          className="border-0"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discount_type"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-space12">
                      |
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-0 px-space4 focus:outline-none focus:!border-0">
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent align="end" side="top">
                          {DISCOUNT_TYPE.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </Card>
            </div>
          </div>
        </div>

        <DrawerFooter>
          <Button type="button" variant={'secondary'} className="w-full">
            Cancel
          </Button>
          <Button type="submit" className="w-full">
            Add
          </Button>
        </DrawerFooter>
      </form>
    </Form>
  );
};

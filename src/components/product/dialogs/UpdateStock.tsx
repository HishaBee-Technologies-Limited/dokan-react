import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/common/text';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/common/Image';
import { SaveIcon } from '@/components/common/icons';
import { DialogFooter } from '@/components/common/Dialog';
import { useForm } from 'react-hook-form';
import { IProduct, IProductPayload } from '@/types/product';
import { createProductOrUpdate } from '@/actions/product/createProductOrUpdate';
import { format } from 'date-fns';
import { usePathname, useRouter } from 'next/navigation';
import { useProductStore } from '@/stores/useProductStore';
import { ProductEnum } from '@/enum/product';
import { toast } from 'sonner';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';

export const UpdateStock = ({
  product,
}: {
  product: {
    uniqueId: IProduct['unique_id'];
    stock: IProduct['stock'];
    sellingPrice: IProduct['selling_price'];
    name: IProduct['name'];
    image: IProduct['image_url'];
    version: IProduct['version'];
    createdAt: IProduct['created_at'];
  };
}) => {
  const form = useForm<{ stock: IProductPayload['stock'] }>({
    defaultValues: { stock: product.stock ?? 0 },
  });
  const router = useRouter();
  const handleClose = useProductStore((state) => state.setDialogState);
  const pathname = usePathname();
  const { setQueryString } = useCreateQueryString();

  const handleSubmit = async ({
    stock,
  }: {
    stock: IProductPayload['stock'];
  }) => {
    const res = await createProductOrUpdate({
      stock,
      unique_id: product.uniqueId,
      name: product.name,
      selling_price: product.sellingPrice,
      ...(product.version && { version: product.version + 1 }),
      updated_at: format(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
      created_at: product?.createdAt,
    });

    if (res?.success) {
      router.refresh();
      router.push(`${pathname}?${setQueryString('product', undefined)}`);

      handleClose({ open: false, header: ProductEnum.UPDATE_STOCK });
    } else {
      // toast()
    }
  };

  const stock = form.watch('stock');

  return (
    <div className="space-y-space16 pt-space16">
      <div className="gap-space8 px-space16 md:px-space32 flex items-center">
        <Image src={product.image} alt="" height={40} width={40} />

        <article className="space-y-space4">
          <Text title={product.name} className="text-sm font-semibold" />
          <Text
            title={String(product.sellingPrice ?? '')}
            variant="secondary"
            className="text-sm font-semibold"
          />
        </article>
      </div>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="gap-space12 pb-space16 px-space16 md:px-space32 flex items-center">
          <Button
            variant={'danger'}
            className="!text-xl !font-bold"
            onClick={() => form.setValue('stock', stock ? stock - 1 : stock)}
            type="button"
          >
            -
          </Button>

          <Input
            type="number"
            className="h-[4.8rem] text-center text-xl"
            {...form.register('stock')}
          />

          <Button
            variant={'success'}
            className="!text-xl !font-bold"
            onClick={() => form.setValue('stock', stock ? stock + 1 : stock)}
            type="button"
          >
            +
          </Button>
        </div>

        <DialogFooter>
          <Button type="submit" className="w-full">
            <SaveIcon />
            Update stock quantity
          </Button>
        </DialogFooter>
      </form>
    </div>
  );
};

import React from 'react';
import Icon from '@/components/common/Icon';
import { ProductEnum } from '@/enum/product';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { Image } from '@/components/common/Image';
import { DialogFooter } from '@/components/common/Dialog';
import { useProductStore } from '@/stores/useProductStore';
import { HistoryIcon } from '@/components/common/icons/HistoryIcon';
import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  MoreVertIcon,
} from '@/components/common/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const ProductDetails = () => {
  const handleDialogOpen = useProductStore((state) => state.setDialogState);
  const handleDrawerOpen = useProductStore((state) => state.setDrawerState);

  return (
    <div>
      <div className="px-space16 space-y-space16 py-space16">
        <div className="border-b border-color pb-space16 flex justify-between gap-space16">
          <div className="flex items-center gap-space8">
            <Image src="" alt="" height={40} width={40} />

            <article className="space-y-space4">
              <Text
                title={`Parachute SkinPure Orange Brightening Face Wash Anti Pimple 100 gm`}
                className="text-sm font-semibold"
              />
              <Text
                title={`৳ 1200`}
                variant="secondary"
                className="text-sm font-semibold"
              />
            </article>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={'icon'} variant={'transparent'}>
                <MoreVertIcon />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" side="bottom" className="w-56">
              <DropdownMenuItem asChild>
                <Button
                  size={'sm'}
                  variant={'transparent'}
                  className="w-full justify-start"
                  onClick={() =>
                    handleDrawerOpen({
                      open: true,
                      header: ProductEnum.EDIT_PRODUCT,
                    })
                  }
                >
                  <EditIcon />
                  Edit
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Button
                  size={'sm'}
                  variant={'transparent'}
                  className="w-full justify-start text-error-100"
                  onClick={() =>
                    handleDialogOpen({
                      open: true,
                      header: ProductEnum.DELETE_PRODUCT,
                    })
                  }
                >
                  <DeleteIcon />
                  Delete
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-space12">
          <article className="rounded-lg px-space12 py-space8 space-y-space4 bg-primary-10 dark:bg-primary-80">
            <Text
              title={`Stock quantity`}
              variant="secondary"
              className="font-semibold text-xs uppercase"
            />
            <Text title={`111`} className="font-semibold" />
          </article>
          <article className="rounded-lg px-space12 py-space8 space-y-space4 bg-primary-10 dark:bg-primary-80">
            <Text
              title={`buying price`}
              variant="secondary"
              className="font-semibold text-xs uppercase"
            />
            <Text title={`৳ 1200  `} className="font-semibold" />
          </article>
          <article className="rounded-lg px-space12 py-space8 space-y-space4 bg-primary-10 dark:bg-primary-80">
            <Text
              title={`profit`}
              variant="secondary"
              className="font-semibold text-xs uppercase"
            />
            <Text title={`৳ 12  `} className="font-semibold" />
          </article>
          <article className="rounded-lg px-space12 py-space8 space-y-space4 bg-primary-10 dark:bg-primary-80">
            <Text
              title={`buying price`}
              variant="secondary"
              className="font-semibold text-xs uppercase"
            />
            <Text title={`৳ 111`} className="font-semibold" />
          </article>
          <article className="rounded-lg px-space12 py-space8 space-y-space4 bg-primary-10 dark:bg-primary-80">
            <Text
              title={`discount`}
              variant="secondary"
              className="font-semibold text-xs uppercase"
            />
            <Text title={`--`} className="font-semibold" />
          </article>
          <article className="rounded-lg px-space12 py-space8 space-y-space4 bg-primary-10 dark:bg-primary-80">
            <Text
              title={`category`}
              variant="secondary"
              className="font-semibold text-xs uppercase"
            />
            <Text title={`111`} className="font-semibold" />
          </article>
        </div>

        <Text
          title="More details of product"
          className="uppercase text-sm font-semibold"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-space12 pb-space16 border-b border-color">
          <article className="rounded-lg px-space12 py-space8 space-y-space4 bg-primary-10 dark:bg-primary-80">
            <Text
              title={`vat (%)`}
              variant="secondary"
              className="font-semibold text-xs uppercase"
            />
            <Text title={`111`} className="font-semibold" />
          </article>
          <article className="rounded-lg px-space12 py-space8 space-y-space4 bg-primary-10 dark:bg-primary-80">
            <Text
              title={`Warranty`}
              variant="secondary"
              className="font-semibold text-xs uppercase"
            />
            <Text title={`--`} className="font-semibold" />
          </article>
          <article className="rounded-lg px-space12 py-space8 space-y-space4 bg-primary-10 dark:bg-primary-80">
            <Text
              title={`low stock alert level`}
              variant="secondary"
              className="font-semibold text-xs uppercase"
            />
            <Text title={`12`} className="font-semibold" />
          </article>
        </div>

        <Text
          title="Product details"
          className="uppercase text-sm font-semibold"
        />

        <Text
          variant="secondary"
          className="text-sm"
          title={`Parachute SkinPure Orange Brightening Facewash is enriched with Orange. It is rich in vitamins, minerals, natural cleansers, and free of harmful chemicals like paraben and sulphate. Use it regularly for a spotless and pimple free face with every wash.`}
        />
      </div>

      <DialogFooter className="flex flex-col gap-space16 rounded-b-lg">
        <Button
          className="w-full"
          onClick={() =>
            handleDialogOpen({ open: true, header: ProductEnum.UPDATE_STOCK })
          }
        >
          <AddIcon />
          Update stock
        </Button>

        <div className="flex gap-space12">
          <Button
            variant={'secondary'}
            className="w-full !font-medium"
            onClick={() =>
              handleDialogOpen({
                open: true,
                header: ProductEnum.SHARE_PRODUCT,
              })
            }
          >
            <Icon icon="lucide:share" />
            Share Product
          </Button>
          <Button
            variant={'secondary'}
            className="w-full !font-medium"
            onClick={() =>
              handleDialogOpen({
                open: true,
                header: ProductEnum.PRODUCT_HISTORY,
              })
            }
          >
            <HistoryIcon />
            Product History
          </Button>
        </div>
      </DialogFooter>
    </div>
  );
};

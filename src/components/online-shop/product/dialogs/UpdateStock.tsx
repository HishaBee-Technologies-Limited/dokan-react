import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/common/text';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/common/Image';
import { SaveIcon } from '@/components/common/icons';
import { DialogFooter } from '@/components/common/Dialog';

export const UpdateStock = () => {
  const [stockValue, setStockValue] = useState<number>(0);

  return (
    <div className="space-y-space16 pt-space16">
      <div className="flex items-center gap-space8 px-space16 md:px-space32">
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

      <form className="">
        <div className="flex items-center gap-space12 pb-space16 px-space16 md:px-space32">
          <Button
            variant={'danger'}
            className="!font-bold !text-xl"
            onClick={() => setStockValue((prv) => prv - 1)}
          >
            -
          </Button>

          <Input
            value={stockValue}
            type="number"
            className="h-[4.8rem] text-center text-xl"
          />

          <Button
            variant={'success'}
            className="!font-bold !text-xl"
            onClick={() => setStockValue((prv) => prv + 1)}
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

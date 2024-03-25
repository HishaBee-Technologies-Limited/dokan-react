'use client';
import React, { useState } from 'react';
import { Text } from '@/components/common/text';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/common/Image';
import { CloseIcon, SaveIcon } from '@/components/common/icons';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const UpdateStockTable = () => {
  const [stockValue, setStockValue] = useState<number>(0);

  return (
    <div className="w-full relative space-y-space8">
      <div className="flex justify-end gap-space16">
        <Button
          variant={'secondary'}
          className="sm:px-space40"
          onClick={() => setStockValue(0)}
        >
          <CloseIcon />
          Cancel
        </Button>
        <Button className="sm:px-space40" disabled>
          <SaveIcon />
          Save
        </Button>
      </div>

      <ScrollArea className="pb-space8">
        <Table wrapperClass="rounded-md border border-color min-w-[80rem]">
          <TableHeader>
            <TableRow>
              <TableHead className="">Product name</TableHead>
              <TableHead>Current stock</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Current stock</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="w-5/12">
                    <div className="flex items-center gap-space8">
                      <Image src="" alt="" height={40} width={40} />

                      <Text
                        title={`Nestle Nescafe Classic Instant Coffee Pouch Pack`}
                        className="text-sm"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="w-2/12">51</TableCell>
                  <TableCell className="w-2/12">৳ 200</TableCell>
                  <TableCell className="w-3/12">
                    <div className="flex items-center gap-space12">
                      <Button
                        size={'sm'}
                        variant={'danger'}
                        className="!font-bold !text-xl"
                        onClick={() => setStockValue((prv) => prv - 1)}
                      >
                        -
                      </Button>
                      <input
                        type="number"
                        value={stockValue}
                        onChange={(e) => setStockValue(Number(e.target.value))}
                        className=" h-[3.6rem] border-b-[.4rem] bg-transparent border-[#0C66E4] text-[#0C66E4] text-md font-medium py-space12 min-w-[10rem] max-w-[14rem] text-center focus:outline-none"
                      />
                      <Button
                        size={'sm'}
                        variant={'success'}
                        className="!font-bold !text-xl"
                        onClick={() => setStockValue((prv) => prv + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Showing 10 of 100 Transactions
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default UpdateStockTable;

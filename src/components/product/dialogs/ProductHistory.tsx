import React from 'react';
import { Text } from '@/components/common/text';
import { Image } from '@/components/common/Image';
import DatePicker from '@/components/common/DatePicker';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const ProductHistory = () => {
  return (
    <div className="py-space16 space-y-space16 px-space16">
      <div className="border-b border-color pb-space16">
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
      </div>

      <DatePicker
        onChange={() => {}}
        triggerClasses="w-full justify-center"
        contentAlign="center"
        presets
      />

      <ScrollArea className="pb-space8">
        <Table wrapperClass="rounded-md border border-color min-w-[53rem]">
          <TableHeader>
            <TableRow>
              <TableHead className="">Entries</TableHead>
              <TableHead>stock price</TableHead>
              <TableHead>pre. stock</TableHead>
              <TableHead>stock adjustment</TableHead>
              <TableHead className="text-end">Stock</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array(3)
              .fill(0)
              .map((item, i) => (
                <TableRow key={item.number}>
                  <TableCell>Aug 09, 2020 08:45 PM</TableCell>
                  <TableCell> ৳ 1,000</TableCell>
                  <TableCell>37</TableCell>
                  <TableCell>
                    <Text title="+20" variant="success" />
                  </TableCell>
                  <TableCell className="text-end">20</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

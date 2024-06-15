import { Text } from '@/components/common/text';
import Card from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function ProfitFromSale() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Text variant="muted" className="flex-none">
          Profit From Sale
        </Text>
        <div className="w-full h-[1px] bg-primary-10"></div>
      </div>

      <Card className="flex flex-col gap-4 p-4 bg-white">
        <div className="flex justify-between items-center gap-4">
          <Text variant="muted">Selling</Text>
          <Text variant="primary" className="font-medium text-lg">
            ৳ 90,0000
          </Text>
        </div>

        <div className="flex justify-between items-center gap-4">
          <Text variant="muted">Purchase Price of the Product</Text>
          <Text variant="primary" className="text-lg">
            (-)৳ 90,0000
          </Text>
        </div>

        <div className="flex justify-between items-center gap-4">
          <Text variant="muted">Delivery Price of the Product</Text>
          <Text variant="primary" className="text-lg">
            (-)৳ 90,0000
          </Text>
        </div>

        <div className="w-full bg-primary-10 h-[1px]"></div>

        <div className="flex justify-between items-center gap-4">
          <Text>Profit from Sale</Text>
          <Text variant="success" className="text-lg">
            (+)৳ 90,0000
          </Text>
        </div>

        <Link href="profit-loss/details" className="self-center">
          <Button
            variant="outline"
            className="border-[#0052CC] text-[#0052CC] hover:bg-[#0052CC] hover:text-white"
          >
            See Details
          </Button>
        </Link>
      </Card>
    </div>
  );
}

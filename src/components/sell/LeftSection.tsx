'use client';
import React from 'react';
import Card from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { Image } from '@/components/common/Image';
import { ScrollArea } from '@/components/ui/scroll-area';
import ProductListQueries from '@/components/sell/ProductListQueries';
import { usePurchase } from '@/stores/usePurchaseStore';
import { IProduct } from '@/types/product';
import { useSellStore } from '@/stores/useSellStore';

export const LeftSection = ({ productData }: { productData: any }) => {
  const setProducts = useSellStore((state) => state.setProducts);
  const products = useSellStore((state) => state.products);

  return (
    <div className="lg:pr-space12 lg:w-4/12 h-full">
      <Card className="h-full w-full shadow">
        <ProductListQueries />

        <ScrollArea className="h-[calc(100%-14rem)] overflow-y-scroll px-space8">
          {productData?.data?.map((product: IProduct) => (
            <div
              key={product.id}
              className="flex items-center gap-space12 justify-between py-space8 px-space8"
            >
              <div className="flex items-center gap-space8">
                <img height={32} width={32} src={product?.image_url} alt="" />
                <Text title={product.name} className="text-sm" />
              </div>
              <Button
                size={'sm'}
                onClick={() => setProducts([...products, product])}
                disabled={products.some((prod) => prod.id === product.id)}
              >
                Add
              </Button>
            </div>
          ))}
        </ScrollArea>
      </Card>
    </div>
  );
};

'use client';
import React, { useEffect, useState } from 'react';
import Card from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { Image } from '@/components/common/Image';
import { ScrollArea } from '@/components/ui/scroll-area';
import ProductListQueries from '@/components/sell/ProductListQueries';
import { IProduct, IProductPayload } from '@/types/product';
import { useInView } from 'react-intersection-observer';

import { usePurchase } from '@/stores/usePurchaseStore';
import { getShopsProducts } from '@/actions/product/getShopProducts';
import { ICommonGetResponse } from '@/types/common';

//TODO: Need refactoring in this

export const LeftSection = ({ productData }: { productData: any }) => {
  const setProducts = usePurchase((state) => state.setProducts);
  const products = usePurchase((state) => state.products);
  const [productRes, setProductsRes] = useState<IProductPayload[]>([]);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.2,
    delay: 2000,
  });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const reFetchProducts = async () => {
    setLoading(true);
    const allProductsResponse = await getShopsProducts({
      params: { page: page + 1, sorted_by: 'new_to_old' },
    });
    console.log(allProductsResponse);
    setProductsRes((prevProd) => {
      let arr = [...prevProd, ...allProductsResponse?.data.data];
      let output = arr.reduce((acc, curr) => {
        let temp = acc.some(
          (prod: IProduct) => prod.unique_id === curr.unique_id
        );
        if (!temp) {
          acc = [...acc, curr];
        }
        return acc;
      }, []);
      return output;
    });
    setPage(allProductsResponse?.data.current_page);
    setLoading(false);
  };
  const fetchProducts = async () => {
    setLoading(true);
    const allProductsResponse = await getShopsProducts({
      params: { page: page, sorted_by: 'new_to_old' },
    });
    console.log(allProductsResponse);
    setProductsRes((prevProd) => {
      let arr = [...prevProd, ...allProductsResponse?.data.data];
      let output = arr.reduce((acc, curr) => {
        let temp = acc.some(
          (prod: IProduct) => prod.unique_id === curr.unique_id
        );
        if (!temp) {
          acc = [...acc, curr];
        }
        return acc;
      }, []);
      return output;
    });
    setPage(allProductsResponse?.data.current_page);
    setLoading(false);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    reFetchProducts();
  }, [inView]);
  return (
    <div className="lg:pr-space12 lg:w-4/12 h-full">
      <Card className="h-full w-full shadow">
        <ProductListQueries />

        <ScrollArea className="h-[calc(100%-14rem)] overflow-y-scroll px-space8">
          {productRes.map((product: any, i: number) => (
            <div key={product.id}>
              <div className="flex items-center gap-space12 justify-between py-space8 px-space8">
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
              {i === productRes.length - 1 ? <div ref={ref}></div> : null}
            </div>
          ))}
          {loading ? <div>Loading</div> : null}
        </ScrollArea>
      </Card>
    </div>
  );
};

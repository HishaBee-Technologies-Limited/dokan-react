'use client';
import React, { useEffect, useState } from 'react';
import Card from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { Image } from '@/components/common/Image';
import { ScrollArea } from '@/components/ui/scroll-area';
import ProductListQueries from '@/components/sell/ProductListQueries';
import { usePurchase } from '@/stores/usePurchaseStore';
import { IProduct, IProductPayload } from '@/types/product';
import { useSellStore } from '@/stores/useSellStore';
import { getShopsProducts } from '@/actions/product/getShopProducts';
import { useInView } from 'react-intersection-observer';
import { useProductPagination } from '@/hooks/useProductPagination';

//TODO: Need refactoring in this

let timer: any;

export const LeftSection = ({ productData }: { productData: any }) => {
  const setProducts = useSellStore((state) => state.setProducts);
  const products = useSellStore((state) => state.products);

  // const [productRes, setProductsRes] = useState<IProductPayload[]>([]);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.2,
    delay: 2000,
  });
  // const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const { loading, hasMore, productRes } = useProductPagination(page, query);

  // const reFetchProducts = async (query: string) => {
  //   setLoading(true);
  //   const allProductsResponse = await getShopsProducts({
  //     params: {
  //       page: query.length > 0 ? 1 : page,
  //       sorted_by: 'new_to_old',
  //       search: query,
  //     },
  //   });
  //   setProductsRes((prevProd) => {
  //     let arr = [...prevProd, ...allProductsResponse?.data.data];
  //     let output = arr.reduce((acc, curr) => {
  //       let temp = acc.some(
  //         (prod: IProduct) => prod.unique_id === curr.unique_id
  //       );
  //       if (!temp) {
  //         acc = [...acc, curr];
  //       }
  //       return acc;
  //     }, []);
  //     return output;
  //   });
  //   setPage(allProductsResponse?.data.current_page);
  //   setLoading(false);
  // };

  // const fetchProducts = async () => {
  //   setLoading(true);
  //   const allProductsResponse = await getShopsProducts({
  //     params: { page: page, sorted_by: 'new_to_old' },
  //   });
  //   setProductsRes((prevProd) => {
  //     let arr = [...prevProd, ...allProductsResponse?.data.data];
  //     let output = arr.reduce((acc, curr) => {
  //       let temp = acc.some(
  //         (prod: IProduct) => prod.unique_id === curr.unique_id
  //       );
  //       if (!temp) {
  //         acc = [...acc, curr];
  //       }
  //       return acc;
  //     }, []);
  //     return output;
  //   });
  //   setPage(allProductsResponse?.data.current_page);
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  // useEffect(() => {
  //   reFetchProducts(query);
  // }, [page, query]);

  // useEffect(() => {
  //   setProductsRes([]);
  // }, [query]);

  useEffect(() => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      setQuery(e.target.value);
      setPage(1);
    }, 1000);
  };
  return (
    <div className="lg:pr-space12 lg:w-4/12 h-full">
      <Card className="h-full w-full shadow">
        <ProductListQueries
          handleSearch={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleSearch(event);
          }}
        />

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

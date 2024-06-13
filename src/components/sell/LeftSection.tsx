'use client';
import { useEffect, useState } from 'react';
import Card from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { ScrollArea } from '@/components/ui/scroll-area';
import ProductListQueries from '@/components/sell/ProductListQueries';
import { useSellStore } from '@/stores/useSellStore';
import { useInView } from 'react-intersection-observer';
import { useProductPagination } from '@/hooks/useProductPagination';

let timer: any;

export const LeftSection = ({ productData }: { productData: any }) => {
  const setProducts = useSellStore((state) => state.setProducts);
  const products = useSellStore((state) => state.products);

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.2,
    delay: 2000,
  });
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const { loading, hasMore, productRes } = useProductPagination(page, query);

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

        <ScrollArea className="h-[calc(100%-14rem)] px-space8">
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

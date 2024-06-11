'use client';
import React, { useEffect, useState } from 'react';
import Card from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { ScrollArea } from '@/components/ui/scroll-area';
import ProductListQueries from '@/components/sell/ProductListQueries';
import { useSellStore } from '@/stores/useSellStore';
import { useInView } from 'react-intersection-observer';
import { useProductPagination } from '@/hooks/useProductPagination';
import Successful from './dialogs/Successful';

import {
  Page,
  Text as PDFText,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  BlobProvider,
  Image,
} from '@react-pdf/renderer';

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
  const bb =
    'https://hishabee.fra1.digitaloceanspaces.com/business-manager/9/logo/TrYbbs28mA6z6b9XHrndLi0acL9wZTcRM921SluT.jpg';
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
      <PDFDownloadLink
        document={
          <Document>
            <Page>
              <View>
                <PDFText>HEllo</PDFText>
                <Image src={`${bb}`} />
              </View>
            </Page>
          </Document>
        }
        fileName="invoice.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            'Loading document...'
          ) : (
            <Button className="w-full h-[9.6rem] flex-col" variant="secondary">
              <Image
                src="/images/print_receipt.svg"
                /*@ts-ignore*/
                alt="d"
                height={36}
                width={36}
              />

              <Text
                title="Download/Print Receipt"
                className="text-sm font-medium"
              />
            </Button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

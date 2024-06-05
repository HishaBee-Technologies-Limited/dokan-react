import { useInView } from 'react-intersection-observer';
import React, { useEffect, useState } from 'react';
import { IProduct, IProductPayload } from '@/types/product';
import { getShopsProducts } from '@/actions/product/getShopProducts';

export const useProductPagination = (page: number, query: string) => {
  const [productRes, setProductsRes] = useState<IProductPayload[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProductsRes([]);
  }, [query]);

  const reFetchProducts = async (query: string) => {
    setLoading(true);
    const allProductsResponse = await getShopsProducts({
      params: {
        page: page,
        sorted_by: 'new_to_old',
        search: query,
      },
    });
    setHasMore(allProductsResponse?.data.data.length > 0);
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
    setLoading(false);
  };

  const fetchProducts = async () => {
    setLoading(true);
    const allProductsResponse = await getShopsProducts({
      params: { page: page, sorted_by: 'new_to_old' },
    });
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
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    reFetchProducts(query);
  }, [page, query]);

  return { loading, productRes, hasMore };
};

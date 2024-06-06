import { useInView } from 'react-intersection-observer';
import React, { useEffect, useState } from 'react';
import { IProduct, IProductPayload } from '@/types/product';
import { getShopsProducts } from '@/actions/product/getShopProducts';
import { getAllDue } from '@/actions/due/getAllDue';
import { IDueListResponse } from '@/types/due/dueResponse';
import { useSearchParams } from 'next/navigation';

export const useDuePagination = (page: number, query: string) => {
  const [dueRes, setDueRes] = useState<IDueListResponse[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentSearchParams = useSearchParams();

  const currentContact = currentSearchParams.get('tab');
  useEffect(() => setDueRes([]), [currentContact]);

  console.log(currentContact);

  const reFetchDues = async (query: string) => {
    setLoading(true);
    const allDueResponse = await getAllDue({
      page: page,
      contact_type: currentContact?.toUpperCase() ?? 'CUSTOMER',
    });
    setLoading(false);

    console.log(allDueResponse?.data?.data?.length! > 0);
    setHasMore(allDueResponse?.data?.data?.length! > 0);
    setDueRes((prevDue) => {
      /*@ts-ignore*/
      let arr = [...prevDue, ...allDueResponse?.data?.data];
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
  };

  const fetchDues = async () => {
    setLoading(true);
    const allDueResponse = await getAllDue({
      page: page,
      contact_type: currentContact?.toUpperCase() ?? 'CUSTOMER',
    });
    console.log(allDueResponse);
    console.log(allDueResponse?.data?.data?.length! > 0);
    setLoading(false);

    setDueRes((prevDue) => {
      /*@ts-ignore*/
      let arr = [...prevDue, ...allDueResponse?.data.data];
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
  };

  useEffect(() => {
    // setDueRes([]);
    fetchDues();
  }, [currentSearchParams]);

  useEffect(() => {
    reFetchDues(query);
  }, [page]);

  return { loading, dueRes, hasMore };
};

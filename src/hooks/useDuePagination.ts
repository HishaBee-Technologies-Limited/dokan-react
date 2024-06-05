import { useInView } from 'react-intersection-observer';
import React, { useEffect, useState } from 'react';
import { IProduct, IProductPayload } from '@/types/product';
import { getShopsProducts } from '@/actions/product/getShopProducts';
import { getAllDue } from '@/actions/due/getAllDue';
import { IDueListResponse } from '@/types/due/dueResponse';

export const useDuePagination = (page: number, query: string) => {
  const [dueRes, setDueRes] = useState<IDueListResponse[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  //   const reFetchDues = async (query: string) => {
  //     setLoading(true);
  //     const allDueResponse = await getAllDue({
  //       page: page,
  //     });
  //     console.log(allDueResponse);
  //     setHasMore(allDueResponse?.data?.data?.length! > 0);
  //     setDueRes((prevDue) => {
  //       let arr = [...prevDue, ...allDueResponse?.data?.data];
  //       let output = arr.reduce((acc, curr) => {
  //         let temp = acc.some(
  //           (prod: IProduct) => prod.unique_id === curr.unique_id
  //         );
  //         if (!temp) {
  //           acc = [...acc, curr];
  //         }
  //         return acc;
  //       }, []);
  //       return output;
  //     });
  //     setLoading(false);
  //   };

  //   const fetchDues = async () => {
  //     setLoading(true);
  //     const allDueResponse = await getAllDue({
  //       page: page,
  //     });
  //     console.log(allDueResponse);

  //     setDueRes((prevDue) => {
  //       let arr = [...prevDue, ...allDueResponse?.data.data];
  //       let output = arr.reduce((acc, curr) => {
  //         let temp = acc.some(
  //           (prod: IProduct) => prod.unique_id === curr.unique_id
  //         );
  //         if (!temp) {
  //           acc = [...acc, curr];
  //         }
  //         return acc;
  //       }, []);
  //       return output;
  //     });
  //     setLoading(false);
  //   };

  //   useEffect(() => {
  //     fetchDues();
  //   }, []);

  //   useEffect(() => {
  //     reFetchDues(query);
  //   }, [page]);

  return { loading, dueRes, hasMore };
};

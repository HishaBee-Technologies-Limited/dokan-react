import { useInView } from 'react-intersection-observer';
import React, { useEffect, useState } from 'react';
import { IProduct, IProductPayload } from '@/types/product';
import { getShopsProducts } from '@/actions/product/getShopProducts';
import { IUserResponse } from '@/types/contact/partyResponse';
import { getAllCustomer } from '@/actions/contacts/getAllCustomer';
import { getAllSupplier } from '@/actions/contacts/getAllSupplier';
import { getAllEmployee } from '@/actions/contacts/getAllEmployee';
import { useSearchParams } from 'next/navigation';
import { ContactType } from '@/enum/contact';

export const useContactPagination = (page: number, query: string) => {
  const [contactRes, setContactRes] = useState<IUserResponse[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentParams = useSearchParams();
  const tab = currentParams.get('tab');

  useEffect(() => {
    setContactRes([]);
  }, [query]);

  const reFetchContact = async (query: string) => {
    setLoading(true);
    let allContactResponse: IUserResponse[] | undefined;
    if (tab === ContactType.CUSTOMER) {
      const allCustomer = await getAllCustomer(page);
      allContactResponse = allCustomer?.data?.data;
    }
    if (tab === ContactType.CUSTOMER) {
      const allSupplier = await getAllSupplier(page);
      allContactResponse = allSupplier?.data?.data;
    }
    if (tab === ContactType.CUSTOMER) {
      const allEmployee = await getAllEmployee(page);
      allContactResponse = allEmployee?.data?.data;
    }

    setHasMore(allContactResponse?.length! > 0);
    allContactResponse &&
      setContactRes((prevProd) => {
        let arr = [...prevProd, ...allContactResponse];
        let output = arr?.reduce((acc, curr) => {
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

  const fetchContacts = async () => {
    setLoading(true);
    console.log('ss', tab === ContactType.CUSTOMER);
    let allContactResponse: IUserResponse[] | undefined;
    if (tab === ContactType.CUSTOMER) {
      const allCustomer = await getAllCustomer(page);
      console.log(allCustomer);

      allContactResponse = allCustomer?.data?.data;
    }
    if (tab === ContactType.SUPPLIER) {
      const allSupplier = await getAllSupplier(page);
      allContactResponse = allSupplier?.data?.data;
    }
    if (tab === ContactType.EMPLOYEE) {
      const allEmployee = await getAllEmployee(page);
      allContactResponse = allEmployee?.data?.data;
    }
    console.log(allContactResponse);
    setContactRes((prevProd) => {
      let arr = allContactResponse && [...prevProd, ...allContactResponse];
      let output = arr?.reduce((acc, curr) => {
        let temp = acc.some(
          (prod: IProduct) => prod.unique_id === curr.unique_id
        );
        if (!temp) {
          acc = [...acc, curr];
        }
        return acc;
      }, []);
      console.log(output);
      return output;
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, [tab]);

  useEffect(() => {
    reFetchContact(query);
  }, [page]);

  return { loading, contactRes, hasMore };
};

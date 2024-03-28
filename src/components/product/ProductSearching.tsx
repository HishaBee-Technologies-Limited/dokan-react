import Search from '@/components/common/forms/Search';
import React from 'react';
import { useProductTable } from '@/hooks/useProductTable';

const ProductSearching = () => {
  const { updateQueryParams, queryParams } = useProductTable();

  return (
    <Search
      onChange={(event) => {
        updateQueryParams({
          ...queryParams,
          search: event.currentTarget.value,
          page: 1,
        });
      }}
      value={queryParams.search ?? ''}
      placeholder="Search by product name"
      wrapperClasses={`max-w-[36rem] lg:w-[37rem]`}
    />
  );
};

export default ProductSearching;

'use client';

import Pagination from '@/components/common/CustomPagination';
import { useProductTable } from '@/hooks/useProductTable';

type ProductPaginationPropsDef = {
  pageCount: number;
  currentPage: number;
  lastPage: number;
};

const ProductPagination = ({
  currentPage,
  lastPage,
  pageCount,
}: ProductPaginationPropsDef) => {
  const { updateQueryParams, queryParams } = useProductTable();

  return (
    <Pagination
      pageCount={pageCount}
      currentPage={currentPage}
      lastPage={lastPage}
      onChanage={(page) => updateQueryParams({ ...queryParams, page: page })}
    />
  );
};
export default ProductPagination;

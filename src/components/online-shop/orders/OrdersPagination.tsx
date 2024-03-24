'use client'

import Pagination from "@/components/common/CustomPagination";
import { useOrdersStore } from "@/stores/useOrdersStore";
import { useOrdersTable } from "@/hooks/useOrdersTable";

type OrdersPaginationPropsDef = {
  pageCount: number;
  currentPage: number;
  lastPage: number;
}

const OrdersPagination = ({ currentPage, lastPage, pageCount }: OrdersPaginationPropsDef) => {
  const {queryParams, setQueryParams } = useOrdersStore()
  const { updateQueryParams } = useOrdersTable()

  return <Pagination pageCount={pageCount} currentPage={currentPage} lastPage={lastPage} onChanage={(page)=> updateQueryParams({...queryParams, page: page})}/>
}
export default OrdersPagination

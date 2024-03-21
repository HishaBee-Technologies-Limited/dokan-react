
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { QueryParamsDef } from "@/types/orders";
import { INITIAL_QUERY_PARAMS } from "@/config/orders";

type OrderStateDef = {
  queryParams: QueryParamsDef
}

type OrdersAction = {
  setQueryParams: (query: QueryParamsDef)=> void;
}

export const useOrdersStore = create<OrderStateDef & OrdersAction>()(immer((set) => ({
  queryParams: INITIAL_QUERY_PARAMS,
  // Update state-------------------------------------
  setQueryParams: (params) => set({ queryParams: params })
})))
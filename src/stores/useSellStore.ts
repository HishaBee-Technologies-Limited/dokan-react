import { IProductPurchase } from '@/components/sell/ProductFiledRow';
import { IProduct } from '@/types/product';
import { IPurchaseHistoryResponse } from '@/types/purchase';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type SellState = {
  sellDrawerState: {
    open: boolean;
    header?: string;
  };
  sellDialogState: {
    open: boolean;
    header?: string;
  };
  sellDetails: any;
  products: IProductPurchase[];
  calculatedProducts: {
    products: IProductPurchase[];
    deliveryCharge?: string;
    totalPrice?: number;
    discount?: string;
    discountType?: string;
    date?: string;
    paymentAmount?: number;
    totalProfit?: number;
    amount?: number;
  };
  currentSell?: IPurchaseHistoryResponse;
};

type SellActions = {
  setSellDrawerState: (params: {
    open: boolean;
    header?: string | undefined;
  }) => void;
  setSellDialogState: (params: {
    open: boolean;
    header?: string | undefined;
  }) => void;
  setSellDetails: (params: any) => void;
  setProducts: (products: IProductPurchase[] | IProduct[]) => void;
  setCalculatedProducts: (products: SellState['calculatedProducts']) => void;
  setCurrentSell: (sell: IPurchaseHistoryResponse) => void;
};

export const useSellStore = create<SellState & SellActions>()(
  immer((set) => ({
    sellDrawerState: { open: false, header: undefined },
    sellDialogState: { open: false, header: undefined },
    sellDetails: {},
    products: [],
    calculatedProducts: {
      deliveryCharge: '',
      totalPrice: 0,
      discount: '',
      products: [],
      date: '',
      paymentAmount: 0,
      totalProfit: 0,
    },

    // Update state-------------------------------------
    setSellDrawerState: (params) => set({ sellDrawerState: params }),
    setSellDialogState: (params) => set({ sellDialogState: params }),
    setSellDetails: (params) => set({ sellDetails: params }),
    setProducts: (products) => set({ products: products }),
    setCalculatedProducts: (products) => set({ calculatedProducts: products }),
    setCurrentSell: (sell) => set({ currentSell: sell }),
  }))
);

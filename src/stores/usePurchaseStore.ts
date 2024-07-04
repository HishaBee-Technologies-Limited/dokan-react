import { IProductPurchase } from '@/components/sell/ProductFiledRow';
import { IProduct } from '@/types/product';
import { IProducts, IPurchaseHistoryResponse } from '@/types/purchase';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface IProductState {
  products: IProductPurchase[];
  calculatedProducts: {
    products: IProductPurchase[];
    deliveryCharge?: string;
    totalPrice?: number;
    discount?: string;
    discountType?: string;
    date?: string;
    paymentAmount?: number;
    due?: number;
    user?: { name: string; mobile: string };
  };
  currentPurchase?: IPurchaseHistoryResponse;
  purchase?: IProducts[];
}
interface IProductStateActions {
  setProducts: (products: IProductPurchase[] | IProduct[]) => void;
  setCalculatedProducts: (
    products: IProductState['calculatedProducts']
  ) => void;
  setCurrentPurchase: (purchase: IPurchaseHistoryResponse) => void;
  setPurchase: (purchase: IProducts[]) => void;
}
export const usePurchase = create<IProductState & IProductStateActions>()(
  // persist(
  (set) => ({
    products: [],
    calculatedProducts: {
      deliveryCharge: '',
      totalPrice: 0,
      discount: '',
      products: [],
      date: '',
      paymentAmount: 0,
      user: { name: '', mobile: '' },
    },
    purchase: [],
    setProducts: (products) => set({ products: products }),
    setCalculatedProducts: (products) => set({ calculatedProducts: products }),
    setCurrentPurchase: (purchase) => set({ currentPurchase: purchase }),
    setPurchase: (purchase) => set({ purchase }),
  })
);

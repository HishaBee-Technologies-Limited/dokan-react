import { IProductPurchase } from '@/components/sell/ProductFiledRow';
import { IProduct } from '@/types/product';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface IProductState {
  products: IProduct[];
  calculatedProducts: {
    products: IProductPurchase[];
    deliveryCharge?: string;
    totalPrice?: number;
    discount?: string;
  };
}
interface IProductStateActions {
  setProducts: (products: IProduct[]) => void;
  setCalculatedProducts: (
    products: IProductState['calculatedProducts']
  ) => void;
}
export const usePurchase = create<IProductState & IProductStateActions>()(
  persist(
    (set) => ({
      products: [],
      calculatedProducts: {
        deliveryCharge: '',
        totalPrice: 0,
        discount: '',
        products: [],
      },
      setProducts: (products) => set({ products: products }),
      setCalculatedProducts: (products) =>
        set({ calculatedProducts: products }),
    }),
    {
      storage: createJSONStorage(() => sessionStorage),

      name: 'products',
    }
  )
);

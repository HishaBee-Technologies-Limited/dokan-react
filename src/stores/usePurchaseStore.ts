import { IProductPurchase } from "@/components/sell/ProductFiledRow";
import { IProduct } from "@/types/product";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ProductState {
  products: IProduct[];
  calculatedProducts: IProductPurchase[];
}
interface ProductStateActions {
  setProducts: (products: IProduct[]) => void;
  setCalculatedProducts: (products: IProductPurchase[]) => void;
}
export const usePurchase = create<ProductState & ProductStateActions>()(
  persist(
    (set) => ({
      products: [],
      calculatedProducts: [],
      setProducts: (products) => set({ products: products }),
      setCalculatedProducts: (products) =>
        set({ calculatedProducts: products }),
    }),
    {
      storage: createJSONStorage(() => sessionStorage),

      name: "products",
    }
  )
);

import { IProduct } from "@/types/product";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ProductState {
  products: IProduct[];
}
interface ProductStateActions {
  setProducts: (products: IProduct[]) => void;
}
export const usePurchase = create<ProductState & ProductStateActions>()(
  persist(
    (set) => ({
      products: [],
      setProducts: (products) => set({ products: products }),
    }),
    {
      storage: createJSONStorage(() => sessionStorage),

      name: "products",
    }
  )
);

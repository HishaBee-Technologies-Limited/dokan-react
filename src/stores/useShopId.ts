import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ShopIdState {
  shopId: number | null;
}
interface ShopIdActions {
  saveShopId: (shopId: number | null) => void;
}
export const useShopId = create<ShopIdState & ShopIdActions>()(
  persist(
    (set) => ({
      shopId: null,
      saveShopId: (shopId) => set({ shopId: shopId }),
    }),
    {
      name: "shop-id",
    }
  )
);
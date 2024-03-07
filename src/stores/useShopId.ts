import { create } from "zustand";

interface ShopIdState {
  shopId: number | null;
}
interface ShopIdActions {
  saveShopId: (shopId: number | null) => void;
}
export const useShopId = create<ShopIdState & ShopIdActions>((set) => ({
  shopId: null,
  saveShopId: (shopId) => set({ shopId: shopId }),
}));

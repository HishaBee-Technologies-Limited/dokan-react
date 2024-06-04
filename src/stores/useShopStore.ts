import { IShopResponse } from '@/types/shop';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ShopIdState {
  shop: IShopResponse | null;
}
interface ShopIdActions {
  saveShop: (shop: IShopResponse | null) => void;
}
export const useShop = create<ShopIdState & ShopIdActions>()(
  persist(
    (set) => ({
      shop: null,
      saveShop: (shop: IShopResponse | null) => set({ shop: shop }),
    }),
    {
      name: 'shop',
    }
  )
);

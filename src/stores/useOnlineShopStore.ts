import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type OnlineShopState = {
  activeUserItem: number;
  orderFilterTab: string;
};

type OnlineShopActions = {
  setActiveUserItem: (index: number) => void;
  setOrderFilterTab: (filter: string) => void;
};

export const useOnlineShopStore = create<OnlineShopState & OnlineShopActions>()(
  immer((set) => ({
    activeUserItem: 0,
    orderFilterTab: 'all',

    // Update state-------------------------------------
    setActiveUserItem: (index) => set({ activeUserItem: index }),
    setOrderFilterTab: (filter) => set({ orderFilterTab: filter }),
  }))
);

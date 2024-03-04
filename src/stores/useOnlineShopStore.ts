
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type OnlineShopState = {
    activeUserItem: number;
}

type OnlineShopActions = {
    setActiveUserItem: (index: number) => void;
}

export const useOnlineShopStore = create<OnlineShopState & OnlineShopActions>()(immer((set) => ({
    activeUserItem: 0,

    // Update state-------------------------------------
    setActiveUserItem: (index) => set({ activeUserItem: index }),
})))
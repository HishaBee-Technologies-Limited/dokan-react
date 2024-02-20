
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type SellState = {
    sellDrawerState: {
        open: boolean;
        header?: string;
    };
    sellDialogState: {
        open: boolean;
        header?: string;
    };
}

type SellActions = {
    setSellDrawerState: (params: {
        open: boolean;
        header?: string | undefined;
    }) => void;
    setSellDialogState: (params: {
        open: boolean;
        header?: string | undefined;
    }) => void;
}

export const useSellStore = create<SellState & SellActions>()(immer((set) => ({
    sellDrawerState: { open: false, header: undefined },
    sellDialogState: { open: false, header: undefined },


    // Update state-------------------------------------
    setSellDrawerState: (params) => set({ sellDrawerState: params }),
    setSellDialogState: (params) => set({ sellDialogState: params })

})))
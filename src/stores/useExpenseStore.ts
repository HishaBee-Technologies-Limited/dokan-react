
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type ContactState = {
    expenseDrawerState: {
        open: boolean;
        header?: string;
    };
}

type ContactActions = {
    setExpenseDrawerState: (params: {
        open: boolean;
        header?: string | undefined;
    }) => void;
}

export const useExpenseStore = create<ContactState & ContactActions>()(immer((set) => ({
    expenseDrawerState: { open: false, header: undefined },

    // Update state-------------------------------------
    setExpenseDrawerState: (params) => set({ expenseDrawerState: params })
})))
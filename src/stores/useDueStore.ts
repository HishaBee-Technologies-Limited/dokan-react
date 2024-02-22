
import { create } from 'zustand'
import { ContactEnum } from '@/enum/contact';
import { immer } from 'zustand/middleware/immer'

type DueState = {
    activeTab: string;
    activeUserItem: number;
    drawerState: {
        open: boolean;
        header?: string;
    };
    dialogState: {
        open: boolean;
        header?: string;
    };
}

type DueActions = {
    setActiveTab: (tab: string) => void;
    setActiveUserItem: (index: number) => void;
    setDrawerState: (params: {
        open: boolean;
        header?: string | undefined;
    }) => void;
    setDialogState: (params: {
        open: boolean;
        header?: string | undefined;
    }) => void;
}

export const useDueStore = create<DueState & DueActions>()(immer((set) => ({
    activeUserItem: 0,
    activeTab: ContactEnum.ACTIVE_TAB,
    drawerState: { open: false, header: undefined },
    dialogState: { open: false, header: undefined },

    // Update state-------------------------------------
    setActiveTab: (tab) => set({ activeTab: tab }),
    setActiveUserItem: (index) => set({ activeUserItem: index }),
    setDrawerState: (params) => set({ drawerState: params }),
    setDialogState: (params) => set({ dialogState: params })
})))
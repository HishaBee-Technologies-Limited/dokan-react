
import { create } from 'zustand'
import { ContactEnum } from '@/enum/contact';
import { immer } from 'zustand/middleware/immer'

type ContactState = {
    activeTab: string;
    activeUserItem: number;
    contactDrawerState: {
        open: boolean;
        header?: string;
    };
}

type ContactActions = {
    setActiveTab: (tab: string) => void;
    setActiveUserItem: (index: number) => void;
    setContactDrawerState: (params: {
        open: boolean;
        header?: string | undefined;
    }) => void;
}

export const useContactStore = create<ContactState & ContactActions>()(immer((set) => ({
    activeUserItem: 0,
    activeTab: ContactEnum.ACTIVE_TAB,
    contactDrawerState: { open: false, header: undefined },

    // Update state-------------------------------------
    setActiveTab: (tab) => set({ activeTab: tab }),
    setActiveUserItem: (index) => set({ activeUserItem: index }),
    setContactDrawerState: (params) => set({ contactDrawerState: params })
})))
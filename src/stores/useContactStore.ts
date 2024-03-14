
import { create } from 'zustand'
import { ContactEnum } from '@/enum/contact';
import { immer } from 'zustand/middleware/immer'
import { IUserResponse } from '@/types/contact/partyResponse';

type ContactState = {
    activeTab: string;
    activeUserItem: number;
    contactDrawerState: {
        open: boolean;
        header?: string;
    };
    party: IUserResponse | undefined;
}

type ContactActions = {
    setActiveTab: (tab: string) => void;
    setActiveUserItem: (index: number) => void;
    setContactDrawerState: (params: {
        open: boolean;
        header?: string | undefined;
    }) => void;
    setParty: (party: IUserResponse) => void;
}

export const useContactStore = create<ContactState & ContactActions>()((set) => ({
    activeUserItem: 0,
    activeTab: ContactEnum.ACTIVE_TAB,
    contactDrawerState: { open: false, header: undefined },
    party: undefined,

    // Update state-------------------------------------
    setActiveTab: (tab) => set({ activeTab: tab }),
    setActiveUserItem: (index) => set({ activeUserItem: index }),
    setContactDrawerState: (params) => set({ contactDrawerState: params }),
    setParty: (party) => set({ party })
}))
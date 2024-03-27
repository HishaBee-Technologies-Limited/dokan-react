import { create } from 'zustand';
import { IUserResponse } from '@/types/contact/partyResponse';

type ContactState = {
  party: IUserResponse | undefined;
  contactDrawerState: {
    open: boolean;
    header?: string;
  };
};

type ContactActions = {
  setParty: (party: IUserResponse) => void;
  setContactDrawerState: (params: {
    open: boolean;
    header?: string | undefined;
  }) => void;
};

export const useContactStore = create<ContactState & ContactActions>()(
  (set) => ({
    party: undefined,
    contactDrawerState: { open: false, header: undefined },

    // Update state-------------------------------------
    setParty: (party) => set({ party }),
    setContactDrawerState: (params) => set({ contactDrawerState: params }),
  })
);

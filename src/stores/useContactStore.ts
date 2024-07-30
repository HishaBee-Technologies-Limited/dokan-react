import { create } from 'zustand';
import { IUserResponse } from '@/types/contact/partyResponse';

type ContactState = {
  party: IUserResponse | undefined;
  contactDrawerState: {
    open: boolean;
    header?: string;
  };
  contacts?: IUserResponse[];
};

type ContactActions = {
  setParty: (party: IUserResponse) => void;
  setContactDrawerState: (params: { open: boolean; header?: string }) => void;
  setContacts: (contact: IUserResponse) => void;
  removeContact: (contact: IUserResponse) => void;
};

export const useContactStore = create<ContactState & ContactActions>()(
  (set) => ({
    party: undefined,
    contactDrawerState: { open: false, header: undefined },
    contacts: [],

    // Update state-------------------------------------
    setParty: (party) => set({ party }),
    setContactDrawerState: (params) => set({ contactDrawerState: params }),
    setContacts: (contact) =>
      set((state) => ({ contacts: [...state.contacts!, contact] })),
    removeContact: (contact) =>
      set((state) => ({
        contacts: state.contacts?.filter((cont) => cont.id !== contact.id),
      })),
  })
);

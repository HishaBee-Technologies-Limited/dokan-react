import { create } from "zustand";
import { ContactEnum } from "../enum/contact";
import { immer } from "zustand/middleware/immer";
import { DueEnum } from "../enum/due";

type DueState = {
  activePageTab: string;
  activeUserItem: number;
  drawerState: {
    open: boolean;
    header?: string;
  };
  dialogState: {
    open: boolean;
    header?: string;
  };
};

type DueActions = {
  setActivePageTab: (tab: string) => void;
  setActiveUserItem: (index: number) => void;
  setDrawerState: (params: {
    open: boolean;
    header?: string | undefined;
  }) => void;
  setDialogState: (params: {
    open: boolean;
    header?: string | undefined;
  }) => void;
};

export const useDueStore = create<DueState & DueActions>()(
  immer((set) => ({
    activeUserItem: 0,
    activePageTab: DueEnum.CUSTOMER,
    drawerState: { open: false, header: undefined },
    dialogState: { open: false, header: undefined },

    // Update state-------------------------------------
    setActivePageTab: (tab) => set({ activePageTab: tab }),
    setActiveUserItem: (index) => set({ activeUserItem: index }),
    setDrawerState: (params) => set({ drawerState: params }),
    setDialogState: (params) => set({ dialogState: params }),
  }))
);

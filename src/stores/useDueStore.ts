import { create } from 'zustand';

type DueState = {
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
  setDrawerState: (params: {
    open: boolean;
    header?: string | undefined;
  }) => void;
  setDialogState: (params: {
    open: boolean;
    header?: string | undefined;
  }) => void;
};

export const useDueStore = create<DueState & DueActions>()((set) => ({
  drawerState: { open: false, header: undefined },
  dialogState: { open: false, header: undefined },

  // Update state-------------------------------------
  setDrawerState: (params) => set({ drawerState: params }),
  setDialogState: (params) => set({ dialogState: params }),
}));

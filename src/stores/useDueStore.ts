import { IDueListResponse } from '@/types/due/dueResponse';
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

  dueList: IDueListResponse[] | undefined;
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
  setDueList: (dueList: IDueListResponse[] | undefined) => void;
};

export const useDueStore = create<DueState & DueActions>()((set) => ({
  drawerState: { open: false, header: undefined },
  dialogState: { open: false, header: undefined },
  dueList: [],

  // Update state-------------------------------------
  setDrawerState: (params) => set({ drawerState: params }),
  setDialogState: (params) => set({ dialogState: params }),
  setDueList: (dueList) => set({ dueList: dueList }),
}));

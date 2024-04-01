import { create } from 'zustand';

type AccessManagementState = {
  drawerState: {
    open: boolean;
    header?: string;
  };
};

type AccessManagementActions = {
  setDrawerState: (params: {
    open: boolean;
    header?: string | undefined;
  }) => void;
};

export const useAccessManagementStore = create<
  AccessManagementState & AccessManagementActions
>()((set) => ({
  drawerState: { open: false, header: undefined },

  // Update state-------------------------------------
  setDrawerState: (params) => set({ drawerState: params }),
}));

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type PurchaseState = {
  drawerState: {
    open: boolean;
    header?: string;
  };
  dialogState: {
    open: boolean;
    header?: string;
  };
  purchaseDetails: any;
};

type PurchaseActions = {
  setDrawerState: (params: {
    open: boolean;
    header?: string | undefined;
  }) => void;
  setDialogState: (params: {
    open: boolean;
    header?: string | undefined;
  }) => void;
  setPurchaseDetails: (params: any) => void;
};

export const usePurchaseStore = create<PurchaseState & PurchaseActions>()(
  immer((set) => ({
    drawerState: { open: false, header: undefined },
    dialogState: { open: false, header: undefined },
    purchaseDetails: {},

    // Update state-------------------------------------
    setDrawerState: (params) => set({ drawerState: params }),
    setDialogState: (params) => set({ dialogState: params }),
    setPurchaseDetails: (params) => set({ purchaseDetails: params }),
  }))
);

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type StockState = {
  drawerState: {
    open: boolean;
    header?: string;
  };
  dialogState: {
    open: boolean;
    header?: string;
  };
};

type StockActions = {
  setDrawerState: (params: {
    open: boolean;
    header?: string | undefined;
  }) => void;
  setDialogState: (params: {
    open: boolean;
    header?: string | undefined;
  }) => void;
};

export const useStockStore = create<StockState & StockActions>()(
  immer((set) => ({
    drawerState: { open: false, header: undefined },
    dialogState: { open: false, header: undefined },

    // Update state-------------------------------------
    setDrawerState: (params) => set({ drawerState: params }),
    setDialogState: (params) => set({ dialogState: params }),
  }))
);
